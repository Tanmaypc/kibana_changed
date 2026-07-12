#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="kibana-dev-build"
CONTAINER_NAME="kibana-build-extract"

INSTALL_BASE="/opt/elastic-stack"
INSTALL_DIR="${INSTALL_BASE}/kibana-9.2.3"
BACKUP_DIR="${INSTALL_DIR}.backup.$(date +%F-%H%M%S)"

SERVICE_NAME="kibana"

echo "==> Building Kibana Docker image..."
docker build -f Dockerfile.dev -t ${IMAGE_NAME} .

echo
echo "==> Optional quick test (Ctrl+C after startup)"
docker run --rm -it \
  -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS=http://localhost:9200 \
  ${IMAGE_NAME} || true

echo
echo "==> Creating container for artifact extraction..."
docker create --name ${CONTAINER_NAME} ${IMAGE_NAME}

echo "==> Extracting built Kibana artifact..."
rm -rf ./kibana-built
docker cp ${CONTAINER_NAME}:/usr/src/kibana/target/kibana-*-linux-x86_64 ./kibana-built

docker rm ${CONTAINER_NAME}

echo
echo "==> Stopping Kibana service..."
sudo systemctl stop ${SERVICE_NAME}

echo "==> Backing up existing Kibana to:"
echo "    ${BACKUP_DIR}"
sudo mv ${INSTALL_DIR} ${BACKUP_DIR}

echo "==> Installing new Kibana build..."
sudo mv ./kibana-built ${INSTALL_DIR}
sudo chown -R kibana:kibana ${INSTALL_DIR}

echo "==> Restoring configuration..."
sudo cp ${BACKUP_DIR}/config/kibana.yml ${INSTALL_DIR}/config/

echo "==> Reloading systemd units..."
sudo systemctl daemon-reload

echo "==> Starting Kibana..."
sudo systemctl start ${SERVICE_NAME}

echo
echo "✅ Kibana replaced successfully."
echo
echo "Rollback if needed:"
echo "  sudo systemctl stop ${SERVICE_NAME}"
echo "  sudo rm -rf ${INSTALL_DIR}"
echo "  sudo mv ${BACKUP_DIR} ${INSTALL_DIR}"
echo "  sudo systemctl start ${SERVICE_NAME}"
