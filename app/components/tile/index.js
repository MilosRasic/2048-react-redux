import React from 'react';

const Tile = ({ item }) => <td className={`tile-${item}`}>{ item }</td>;

export default Tile;
