export async function registerUser(
  telegramUser,
  env
) {
  const id =
    telegramUser.id.toString();

  const exists =
    await env.DB.prepare(
      `
      SELECT telegram_id
      FROM users
      WHERE telegram_id = ?
    `
    )
      .bind(id)
      .first();

  if (exists) return;

  await env.DB.prepare(
    `
    INSERT INTO users
    (
      telegram_id,
      first_name,
      username
    )
    VALUES
    (
      ?,
      ?,
      ?
    )
  `
  )
    .bind(
      id,
      telegramUser.first_name || "",
      telegramUser.username || ""
    )
    .run();
}
