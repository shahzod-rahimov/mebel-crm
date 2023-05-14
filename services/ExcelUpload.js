const multer = require("multer");
const { resolve } = require("path");
const { existsSync, unlink, mkdirSync } = require("fs");

const diskStorage = multer.diskStorage({
  destination: (req, file, done) => {
    if (!file) return done(new Error("Upload file error"), null);

    const isFolderExists = existsSync(resolve(process.cwd(), "public"));

    if (!isFolderExists) {
      mkdirSync(resolve(process.cwd(), "public"), {
        recursive: true,
      });
    }
    const fileName = `${Date.now()}-${file.originalname}`;

    const fileExits = existsSync(
      resolve(process.cwd(), `public/${fileName}`)
    );

    if (!fileExits) return done(null, resolve(process.cwd(), "public"));

    unlink(resolve(process.cwd(), `public/${fileName}`), (error) => {
      if (error) return done(error);
      return done(null, resolve(process.cwd(), "public"));
    });
  },

  filename: (req, file, done) => {
    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const extFile = file.originalname.replace(".", "");
      const extPattern = /(xlsx)/gi.test(extFile);
      if (!extPattern)
        return done(new TypeError("File format is not valid"), null);

      return done(null, fileName);
    }
  },
});

const excelFileUpload = multer({ storage: diskStorage, limits: 1000000 });

module.exports = { excelFileUpload };
