import { divIcon, point } from 'leaflet';

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

export default createClusterCustomIcon;

// static geo position long and lat

export const markers = [
  {
    geoPosition: [-6.2, 106.8456],
    popUp: 'Ibu Kota Indonesia, Jakarta',
    name: 'Jakarta',
  },
];
