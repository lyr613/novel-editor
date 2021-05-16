export const req_images = () => {
    if (process.env.NODE_ENV === 'development') {
        return require('images')
    }
    return require('../buildin/node_modules/images')
}
