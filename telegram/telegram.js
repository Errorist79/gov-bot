const telegramBot = require("node-telegram-bot-api");
const token = "";
var cron = require("node-cron");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const bot = new telegramBot(token, { polling: true });
var botActive = false;

var totalVote;

bot.on("message", (msg) => {
  const chatID = msg.chat.id;

  if (msg.text == "/start") {
    bot.sendMessage(chatID, `<b><i>${msg.chat.username}</i> bot has activated.</b>`, { parse_mode: "HTML" });

    async function getUser() {
      try {
        const response = await fetch("https://api.korellia.kyve.network/cosmos/gov/v1beta1/proposals?pagination.limit=500");

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!botActive) {
          totalVote = result.proposals.length;
          botActive = true;
        } else {
          if (totalVote != result.proposals.length) {
            totalVote = result.proposals.length;

            if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.CreatePoolProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Binaries:</b> " +
                  Object.values(result.proposals).pop().content.binaries +
                  "\n<b>Pool name:</b> " +
                  Object.values(result.proposals).pop().content.name +
                  "\n<b>Runtime:</b> " +
                  Object.values(result.proposals).pop().content.runtime +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Binaries:</b> " +
                  Object.values(result.proposals).pop().content.plan.info +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.UpdatePoolProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Binaries:</b> " +
                  Object.values(result.proposals).pop().content.binaries +
                  +"\n" +
                  "\n<b>Pool name:</b> " +
                  Object.values(result.proposals).pop().content.name +
                  "\n<b>Pool ID:</b> " +
                  Object.values(result.proposals).pop().content.id +
                  "\n<b>Runtime:</b> " +
                  Object.values(result.proposals).pop().content.runtime +
                  +"\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.params.v1beta1.ParameterChangeProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Will change:</b> " +
                  JSON.stringify(Object.values(result.proposals).pop().content.changes).replace(/"subspace": "registry",/g, "") +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.PausePoolProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Pool ID:<b> " +
                  Object.values(result.proposals).pop().content.id +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.UnpausePoolProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Pool ID:</b> " +
                  Object.values(result.proposals).pop().content.id +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/cosmos.gov.v1beta1.TextProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
              );
            } else if (Object.values(result.proposals).pop().content["@type"].indexOf("/kyve.registry.v1beta1.SchedulePoolUpgradeProposal") != -1) {
              bot.sendMessage(
                chatID,
                "<b>Proposal:</b> " +
                  Object.values(result.proposals).pop().proposal_id +
                  "\n<b>Title:</b> " +
                  Object.values(result.proposals).pop().content.title +
                  "\n" +
                  "\n<b>Description:</b> " +
                  Object.values(result.proposals).pop().content.description +
                  "\n<b>Runtime:</b> " +
                  Object.values(result.proposals).pop().content.runtime +
                  "\n<b>Scheduled at:</b> " +
                  Object.values(result.proposals).pop().content.scheduled_at +
                  "\n<b>Binaries:</b> " +
                  Object.values(result.proposals).pop().content.binaries +
                  "\n" +
                  "\n<b>Submit time:</b> " +
                  Object.values(result.proposals).pop().submit_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().submit_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().submit_time.slice(13, 19) +
                  "\n<b>Voting Time:</b> " +
                  Object.values(result.proposals).pop().voting_start_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_start_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_start_time.slice(13, 19) +
                  " - " +
                  Object.values(result.proposals).pop().voting_end_time.slice(0, 10) +
                  ", " +
                  (Number(Object.values(result.proposals).pop().voting_end_time.slice(11, 13)) + 3) +
                  Object.values(result.proposals).pop().voting_end_time.slice(13, 19) +
                  "\n\n <b>How to vote via CLI?</b>\n  <pre language='html'>kyved tx gov vote " +
                  Object.values(result.proposals).pop().proposal_id +
                  " [yes/no/no_with_veto/abstain] --chain-id korellia --from [your_key_name] </pre>",

                { parse_mode: "HTML" }
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

    cron.schedule("*/5 * * * * *", () => {
      getUser();
    });
  }
});
