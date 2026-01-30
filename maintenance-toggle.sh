#!/bin/bash
# Maintenance Mode Toggle Script
# Usage: ./maintenance-toggle.sh [enable|disable]

MAINTENANCE_FILE="/etc/nginx/sites-available/gavinpicard-maintenance"
NGINX_CONFIG="/etc/nginx/sites-available/gavinpicard"
NGINX_ENABLED="/etc/nginx/sites-enabled/gavinpicard"
MAINTENANCE_HTML="/opt/gavinpicard/maintenance.html"

if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root or with sudo"
    exit 1
fi

case "$1" in
    enable)
        echo "Enabling maintenance mode..."
        
        # Create maintenance config
        cat > "$MAINTENANCE_FILE" << EOF
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name gavinpicard.com www.gavinpicard.com;

    ssl_certificate /etc/letsencrypt/live/gavinpicard.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gavinpicard.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /opt/gavinpicard;
    index maintenance.html;

    location / {
        try_files /maintenance.html =503;
        add_header Retry-After 60 always;
    }
}
EOF
        
        # Disable normal config
        if [ -L "$NGINX_ENABLED" ]; then
            rm "$NGINX_ENABLED"
        fi
        
        # Enable maintenance config
        ln -sf "$MAINTENANCE_FILE" /etc/nginx/sites-enabled/gavinpicard-maintenance
        
        # Test and reload
        if nginx -t; then
            systemctl reload nginx
            echo "✅ Maintenance mode enabled"
        else
            echo "❌ Nginx config test failed"
            exit 1
        fi
        ;;
        
    disable)
        echo "Disabling maintenance mode..."
        
        # Remove maintenance config
        if [ -L /etc/nginx/sites-enabled/gavinpicard-maintenance ]; then
            rm /etc/nginx/sites-enabled/gavinpicard-maintenance
        fi
        
        # Enable normal config
        ln -sf "$NGINX_CONFIG" "$NGINX_ENABLED"
        
        # Test and reload
        if nginx -t; then
            systemctl reload nginx
            echo "✅ Maintenance mode disabled - site is live"
        else
            echo "❌ Nginx config test failed"
            exit 1
        fi
        ;;
        
    *)
        echo "Usage: $0 [enable|disable]"
        echo ""
        echo "Examples:"
        echo "  sudo $0 enable   - Show maintenance page"
        echo "  sudo $0 disable  - Return to normal site"
        exit 1
        ;;
esac

