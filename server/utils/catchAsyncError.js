const { ZodError } = require("zod");

function catchAsync(fn) {
    return function (req, res) {
        fn(req, res).catch((err) => {
            if (err instanceof ZodError) {
                const error =
                    err.errors[0].message + " in " + err.errors[0].path;

                return res.status(401).json({ message: error });
            }

            return res.status(500).json({ message: err.message });
        });
    };
}

module.exports = catchAsync;
