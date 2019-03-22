/*global module, process*/

const localhost = (process.env.PLATFORM === 'linux') ? 'localhost' : 'host.docker.internal';

module.exports = {
    routes: {
        '/apps/notifications': { host: `http://${localhost}:8002` },
        '/api/notifications': { host: `http://${localhost}:3000` }
    }
};
