import 'dotenv/config';
import { Telegraf } from 'telegraf';
import logger from './util/logger';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  logger.info('Telegram bot has started by', ctx.from.first_name);
});

bot.launch()
  .then(() => {
    logger.info('Telegram bot has been launched');
  })
  .catch((e) => {
    logger.error('Telegram bot. Launch Error:', e);
  });