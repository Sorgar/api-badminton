function halLinkObject(path, type = '', name = '') {
    return {
        href: path,
        type: type ? type : 'application/json',
        name: name
    };
}

function mapTerrainListToResourceObject(terrains) {
    const embedded = terrains.map(terrain => ({
        _links: {
            self: halLinkObject(`/terrain/${terrain.id}`),
        },
        id: terrain.id,
        disponible: terrain.disponible
    }));

    return {
        _links: {
            self: halLinkObject('/terrain')
        },
        _embedded: {
            terrains: embedded
        }
    };
}

module.exports = { halLinkObject, mapTerrainListToResourceObject };
