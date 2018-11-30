import * as amqp from "amqplib";
import { Connection } from "amqplib";

/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/10/26
 * Time: 14:41
 *
 */
export default class ConnectionUtil {
  public static async getConnection(): Promise<Connection> {
    // const conn = await amqp.connect('amqp://locahost');
    const conn = await amqp.connect({
      protocol: "amqp",
      hostname: "localhost",
      port: 5673,
      username: "admin",
      password: "123456",
      locale: "en_US",
      heartbeat: 0,
      vhost: "/admin"
    });
    return conn;
  }
}
