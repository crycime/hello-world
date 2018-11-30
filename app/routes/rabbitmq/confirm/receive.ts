/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/10/31
 * Time: 15:10
 *
 */
import ConnectionUtil from "../util/connectionUtil.js";

class Receive {
  private static ex: string = "test_exchange_topic";
  public static async main(): Promise<void> {
    const connection = await ConnectionUtil.getConnection();
    const ch = await connection.createChannel();
    // durable消息持久化
    await ch.assertExchange(this.ex, "topic", { durable: false });

    // exclusive使隊列衹有一個消費者
    const q = await ch.assertQueue("access", { exclusive: true });

    ch.bindQueue("access", this.ex, "goods.#");

    // noAck true:消息發送到消費者立即刪
    // @ts-ignore
    await ch.consume(
      "access",
      msg => {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
      },
      { noAck: true }
    );
  }
}

Receive.main()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
