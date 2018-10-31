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
    // const conn = await amqp.connect('amqp://admin:123456@locahost');
    const conn = await amqp.connect("amqp://localhost");
    return conn;
  }
}
