#!/bin/bash

installNodeAndYarn () {
    echo "Installing nodejs and yarn..."
    sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
    sudo apt-get install -y nodejs npm
    sudo npm install -g yarn
    sudo npm install -g pm2
    sudo ln -s /usr/bin/nodejs /usr/bin/node
    sudo chown -R explorer:explorer /home/explorer/.config
    clear
}

installNginx () {
    echo "Installing nginx..."
    sudo apt-get install -y nginx
    sleep 5
    sudo systemctl stop nginx
    sleep 5
    sudo rm -f /etc/nginx/sites-available/default
    sleep 5
    sudo cat > /etc/nginx/sites-available/default << EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
    #server_name explorer.fdreserve.com;
    server_name _;

    gzip on;
    gzip_static on;
    gzip_disable "msie6";

    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;

    location / {
        proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
    }

    #listen [::]:443 ssl ipv6only=on; # managed by Certbot
    #listen 443 ssl; # managed by Certbot
    #ssl_certificate /etc/letsencrypt/live/explorer.bulwarkcrypto.com/fullchain.pem; # managed by Certbot
    #ssl_certificate_key /etc/letsencrypt/live/explorer.bulwarkcrypto.com/privkey.pem; # managed by Certbot
    #include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

#server {
#    if ($host = explorer.fdreserve.com) {
#        return 301 https://\$host\$request_uri;
#    } # managed by Certbot
#
#	listen 80 default_server;
#	listen [::]:80 default_server;
#
#	server_name explorer.bulwarkcrypto.com;
#   return 404; # managed by Certbot
#}
EOL
    sudo systemctl start nginx
    sudo systemctl enable nginx
    clear
}

installMongo () {
    echo "Installing mongodb..."
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
    sudo echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
    sudo apt-get update -y
    sudo apt-get install -y --allow-unauthenticated mongodb-org
    sudo chown -R mongodb:mongodb /data/db
    sudo systemctl start mongod
    sleep 2
    sudo systemctl enable mongod
    sleep 2
    mongo blockex --eval "db.createUser( { user: \"$rpcuser\", pwd: \"$rpcpassword\", roles: [ \"readWrite\" ] } )"
    sleep 2
    clear
}

installBlockEx () {
    echo "Installing BlockEx..."
    git clone https://github.com/LoulouCrypto/blockex.git /home/explorer/blockex
    cd /home/explorer/blockex
    yarn install
    cat > /home/explorer/blockex/config.server.js << EOL
/**
 * Keep all your API & secrets here. DO NOT IMPORT THIS FILE IN /client folder
 */
const secretsConfig = {
  db: {
    host: '127.0.0.1',
    port: '27017',
    name: 'blockex',
    user: '$rpcuser',
    pass: '$rpcpassword'
  },
  rpc: {
    host: '127.0.0.1',
    port: '12475',
    user: '$rpcuser',
    pass: '$rpcpassword',
    timeout: 10000, // 10 seconds
  },
}

module.exports = { secretsConfig }; // This is returned as an object on purpose so you have to be explicit at stating that you are accessing a secrets config
EOL

cd /home/explorer/blockex
sleep 1
yarn run cron:coin
sleep 1
yarn run cron:masternode
sleep 1
yarn run cron:peer
sleep 1
yarn run cron:block
sleep 1
yarn run cron:rich
sleep 1 
yarn run build:web
sleep 1

    cat > mycron << EOL
    
*/1 * * * * cd /home/explorer/blockex && ./script/cron_block.sh >> ./tmp/block.log 2>&1
*/1 * * * * cd /home/explorer/blockex && /usr/bin/nodejs ./cron/masternode.js >> ./tmp/masternode.log 2>&1
*/1 * * * * cd /home/explorer/blockex && /usr/bin/nodejs ./cron/peer.js >> ./tmp/peer.log 2>&1
*/1 * * * * cd /home/explorer/blockex && /usr/bin/nodejs ./cron/rich.js >> ./tmp/rich.log 2>&1
*/5 * * * * cd /home/explorer/blockex && /usr/bin/nodejs ./cron/coin.js >> ./tmp/coin.log 2>&1
0 0 * * * cd /home/explorer/blockex && /usr/bin/nodejs ./cron/timeIntervals.js >> ./tmp/timeIntervals.log 2>&1
EOL
    crontab mycron
    rm -f mycron
    pm2 start ./server/index.js
    sudo pm2 startup ubuntu
}

# Setup
echo "Updating system..."
sudo apt-get update -y
sudo apt-get install -y apt-transport-https build-essential cron curl gcc git g++ make sudo vim wget automake autoconf
clear

# Variables
echo "============================================================"
echo "Setting up variables..."
echo "Please take the RPX USER:PASSWORD of your FDR Wallet."
echo "If you don't have it, close this install and find them in :"
echo "nano .fdreserve/fdreserve.conf"
echo "============================================================"
echo " "
echo -e "Enter the FDR RPC User"
read -e rpcuser
echo -e "Enter the FDR RPC password"
read -e rpcpassword
echo -e "Please Check"
echo "User: $rpcuser"
echo "Pass: $rpcpassword"
sleep 10s
clear

# Check for blockex folder, if found then update, else install.
if [ ! -d "/home/explorer/blockex" ]
then
    installNginx
    installMongo
    installNodeAndYarn
    installBlockEx
    echo "Finished installation!"
else
    cd /home/explorer/blockex
    git pull
    pm2 restart index
    echo "BlockEx updated!"
fi
