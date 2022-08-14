const { Client, Intents, GatewayIntentBits } = require("discord.js");

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
        const response = await fetch("https://api.korellia.kyve.network/cosmos/gov/v1beta1/proposals?pagination.offset=0&pagination.limit=5&pagination.countTotal=true&pagination.reverse=true");

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
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Binaries:** " +
                  Object.values(result.proposals).pop().content.binaries +
                  "\n**Pool name:** " +
                  Object.values(result.proposals).pop().content.name +
                  "\n**Runtime:** " +
                  Object.values(result.proposals).pop().content.runtime +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Binaries:** " +
                  Object.values(result.proposals).pop().content.plan.info +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.UpdatePoolProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Binaries:** " +
                  Object.values(result.proposals).pop().content.binaries +
                  +"\n" +
                  "\n**Pool name:** " +
                  Object.values(result.proposals).pop().content.name +
                  "\n**Pool ID:** " +
                  Object.values(result.proposals).pop().content.id +
                  "\n**Runtime:** " +
                  Object.values(result.proposals).pop().content.runtime +
                  +"\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.params.v1beta1.ParameterChangeProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Will change:** " +
                  JSON.stringify(Object.values(result.proposals).pop().content.changes).replace(/"subspace": "registry",/g, "") +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.PausePoolProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Pool ID:** " +
                  Object.values(result.proposals).pop().content.id +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.UnpausePoolProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Pool ID:** " +
                  Object.values(result.proposals).pop().content.id +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.gov.v1beta1.TextProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.SchedulePoolUpgradeProposal") != -1) {
              message.reply(
                "**Proposal:** " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n**Title:** " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n**Description:** " +
                  Object.values(result.proposals).pop().content.description +
                  "\n**Runtime:** " +
                  Object.values(result.proposals).pop().content.runtime +
                  "\n**Scheduled at:** " +
                  Object.values(result.proposals).pop().content.scheduled_at +
                  "\n**Binaries:** " +
                  Object.values(result.proposals).pop().content.binaries +
                  "\n" +
                  "\n**Submit time:** " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n**Voting Time:** " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n **How to vote via CLI?** ```kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] ```"
              );
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
