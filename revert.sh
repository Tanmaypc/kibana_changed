sudo systemctl stop kibana
sudo rm -rf /opt/elastic-stack/kibana-9.2.3
sudo mv /opt/elastic-stack/kibana-9.2.3.backup.* /opt/elastic-stack/kibana-9.2.3
sudo systemctl start kibana
