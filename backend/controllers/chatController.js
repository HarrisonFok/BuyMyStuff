import asyncHandler from "express-async-handler";
// const exec = util.promisify(require('child_process').exec);
import { exec } from 'child_process';

// @desc Execute chat app
// @route GET /api/chat
// @access Private
const execChatApp = asyncHandler(async (req, res) => {
    console.log("Got here")
    async function innerRunChatApp() {
        try {
            const { stdout, stderr } = await exec('npm run chatDev');
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        }catch (err) {
           console.error(err);
        };
    }
    innerRunChatApp()
});

export {execChatApp}