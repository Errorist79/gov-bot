const { Client, Intents, GatewayIntentBits } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var botActive = false;

var totalVote;
var propId = [""];
var propType = [""];
client.on("messageCreate", async (message) => {
  if (message.content == "!active") {
    message.reply(`${client.user.tag} activated.`);

    async function getUser() {
      try {
        const response = await fetch("https://api.testnet.run/kyve.json");

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        //message.reply(result.pagination.total);

        //message.reply(result.proposals[0].content["@type"]);

        if (!botActive) {
          totalVote = result.proposals.length;
          botActive = true;
        } else {
          if (totalVote != result.proposals.length) {
            totalVote = result.proposals.length;

            if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.CreatePoolProposal") != -1) {

              try {
                binaries_value = "linux: " + Object.values(result.proposals).pop().content.binaries.split('linux\":\"')[1].split('\"')[0] + "\nmacos: " + Object.values(result.proposals).pop().content.binaries.split('macos\":\"')[1].split('\"')[0];
                const govKyve = new EmbedBuilder()
                  .setColor(0x027615)
                  .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                  .setTitle(Object.values(result.proposals).pop().content.title)
                  .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                  .setDescription(Object.values(result.proposals).pop().content.description)
                  .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                  .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                    { name: 'Pool Name', value: Object.values(result.proposals).pop().content.name, inline: true },
                    { name: 'Version', value: Object.values(result.proposals).pop().content.version, inline: true },
                    { name: 'Runtime', value: Object.values(result.proposals).pop().content.runtime, inline: true },
                  )
                  .addFields({ name: 'Binaries', value: binaries_value })
                  .addFields({ name: '\u200B', value: '\u200B' })
                  .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                  .addFields({ name: 'Voting Period', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                  .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                  .setTimestamp()
                  message.channel.send({ embeds: [govKyve] });
              } catch (err) {
                const govKyve = new EmbedBuilder()
                  .setColor(0x027615)
                  .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                  .setTitle(Object.values(result.proposals).pop().content.title)
                  .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                  .setDescription(Object.values(result.proposals).pop().content.description)
                  .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                  .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                    { name: 'Pool Name', value: Object.values(result.proposals).pop().content.name, inline: true },
                    { name: 'Version', value: Object.values(result.proposals).pop().content.version, inline: true },
                    { name: 'Runtime', value: Object.values(result.proposals).pop().content.runtime, inline: true },
                  )
                  .addFields({ name: '\u200B', value: '\u200B' })
                  .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                  .addFields({ name: 'Voting Period', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                  .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                  .setTimestamp()
                  message.channel.send({ embeds: [govKyve] });
              }

              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal") != -1) {

              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields(
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                  { name: 'Version', value: Object.values(result.proposals).pop().content.plan.name, inline: true },
                  { name: 'Target Height', value: Object.values(result.proposals).pop().content.plan.height, inline: true },
                )
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields({ name: 'Binaries', value: Object.values(result.proposals).pop().content.plan.info.split('binaries": {"')[1].replace(/"/g, '').replace(/,/g, '\n') })
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                .setTimestamp()
              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal") != -1) {
              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields({ name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id })
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                .setTimestamp()
      
              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.UpdatePoolProposal") != -1) {
              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields(
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                  { name: 'Pool Name', value: Object.values(result.proposals).pop().content.name, inline: true },
                  { name: 'Pool ID', value: Object.values(result.proposals).pop().content.id, inline: true },
                  { name: 'Runtime', value: Object.values(result.proposals).pop().content.runtime, inline: true },
                )
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                .setTimestamp()

              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.params.v1beta1.ParameterChangeProposal") != -1) {
              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id })
                .addFields({ name: 'Will change', value: JSON.stringify(Object.values(result.proposals).pop().content.changes).replace(/"subspace": "registry",/g, "") })
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                .setTimestamp()

              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.PausePoolProposal") != -1) {

              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields(
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                  { name: 'Pool ID', value: Object.values(result.proposals).pop().content.id, inline: true },
                )
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })
                .setTimestamp()

              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.UnpausePoolProposal") != -1) {

              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields(
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                  { name: 'Pool ID', value: Object.values(result.proposals).pop().content.id, inline: true },
                )
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })

                .setTimestamp()

              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.gov.v1beta1.TextProposal") != -1) {
              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id })
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })

                .setTimestamp()

              message.channel.send({ embeds: [govKyve] });

            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.SchedulePoolUpgradeProposal") != -1) {
              const govKyve = new EmbedBuilder()
                .setColor(0x027615)
                .setAuthor({ name: 'Kyve Governance', iconURL: 'https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg', url: 'https://kyve.network' })
                .setTitle(Object.values(result.proposals).pop().content.title)
                .setURL('https://app.kyve.network/#/governance/' + Object.values(result.proposals).pop().proposal_id)
                .setDescription(Object.values(result.proposals).pop().content.description)
                .setThumbnail('https://aws1.discourse-cdn.com/standard20/uploads/kyve/original/1X/3717404dc41ed25ba3d7bdc4e244883c44edcc4f.jpeg')
                .addFields(
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Proposal ID', value: Object.values(result.proposals).pop().proposal_id, inline: true },
                  { name: 'Runtime', value: Object.values(result.proposals).pop().content.runtime, inline: true },
                  { name: 'Scheduled at', value: Object.values(result.proposals).pop().content.scheduled_at, inline: true },
                )
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Binaries', value: "linux: " + Object.values(result.proposals).pop().content.binaries.split('linux\":\"')[1].split('\"')[0] + "\nmacos: " + Object.values(result.proposals).pop().content.binaries.split('macos\":\"')[1].split('\"')[0] })
                .addFields({ name: '\u200B', value: '\u200B' })
                .addFields({ name: 'Submit Time', value: Object.values(result.proposals).pop().submit_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().submit_time.slice(13, 19) })
                .addFields({ name: 'Voting Time', value: Object.values(result.proposals).pop().voting_start_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_start_time.slice(13, 19) + " - " + Object.values(result.proposals).pop().voting_end_time.slice(0, 10) + ", " + (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) + Object.values(result.proposals).pop().voting_end_time.slice(13, 19) })
                .addFields({ name: 'How to vote via CLI?', value: "```kyved tx gov vote " + Object.values(result.proposals).pop().proposal_id + " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name]```" })

                .setTimestamp()
              message.channel.send({ embeds: [govKyve] });
            } else {
            }
          } else {
            // message.reply("api not change");
          }
        }
        botActive = true;
      } catch (err) {
        console.log(err);
      }
    }

    getUser();

    setInterval(() => {
      getUser();
    }, 5000);
  }
});

client.login("");
