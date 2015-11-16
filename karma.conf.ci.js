/* eslint-disable camelcase */
module.exports = function (config) {
    config.set({
        coverageReporter: {
            reporters: [
                {type: "html", subdir: "html"},
                {type: "lcovonly", subdir: "."}
            ]
        },
        autoWatch: false,
        singleRun: true
    });

    if (process.env.USE_CLOUD === "true" && process.env.SAUCE_USERNAME) {
        require("./karma.conf.cloud.js")(config);
    } else {
        console.log("running default test on Chrome");
        config.set({
            customLaunchers: {
                Chrome_CI: {
                    base: "Chrome",
                    flags: ["--no-sandbox"]
                }
            },
            browsers: ["Chrome_CI"]
        });
    }
};
