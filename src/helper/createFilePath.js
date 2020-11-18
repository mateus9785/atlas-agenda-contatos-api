const resizeOptimizeImages = require('resize-optimize-images');
const { error } = require("./error");

const createFilePath = {
    async resizeImageInPath(filePath, width, quality){
        const options = {
            images: [filePath, filePath],
            width: width,
            quality: quality
        };
        
        try {
            await resizeOptimizeImages(options);
        } catch (exception) {
            await error(null, null, null, exception.message, arguments.callee.name, "/intermediateProduct/:idIntermediateProduct/intermediateImage", null);
        }
    },
};

module.exports = createFilePath;