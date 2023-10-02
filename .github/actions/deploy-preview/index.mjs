import {getInput, setOutput} from "@actions/core";
import {exec} from "@actions/exec";

const expires = getInput("expires");
const configuredChannelId = getInput("channel-id");

async function run() {
  const channelId = escapeChannelId(configuredChannelId);
  let deployOutputBuffers = [];
  await exec(
    'npx firebase',
    [
      'hosting:channel:deploy',
      channelId,
      ...(expires ? ["--expires", expires] : []),
      '--json'
    ],
    {
      listeners: {
        stdout(data) {
          deployOutputBuffers.push(data)
        }
      },
    }
  );

  if (deployOutputBuffers.length === 0) {
    throw new Error('Deployment output missing');
  }

  const output = JSON.parse(deployOutputBuffers[deployOutputBuffers.length - 1].toString('utf-8'));

  if (output.status === 'error') {
    throw new Error(`Deployment failed: ${output.error}`);
  }

  const urls = Object.values(output.result).map(site => site.url);
  setOutput("url", urls[0]);
}

// Channel ID should only contain letters, numbers and hyphens
function escapeChannelId(configureChannelId) {
  const invalidCharsRegex = /[^a-zA-Z0-9\-]/g;
  return configureChannelId.replace(invalidCharsRegex, '-');
}

run();
