/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/10/31
 * Time: 14:07
 *
 */
import ConnectionUtil from "../util/connectionUtil.js";

class Send {
  private static ex: string = "test_exchange_fanout";
  private static message: string = "Hello World!";
  public static async main(): Promise<void> {
    const connection = await ConnectionUtil.getConnection();
    const ch = await connection.createChannel();
    await ch.assertExchange(this.ex, "fanout", { durable: false });
    await ch.publish(this.ex, "", Buffer.from(this.message));
    console.log("---send " + this.message);
    await ch.close();
    await connection.close();
    return;
  }
}

Send.main()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
