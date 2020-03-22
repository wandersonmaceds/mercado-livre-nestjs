export class Message {
  /**
   *
   * @param from a string that represents the user's email sender.
   * @param to a string email to where the message will be sent.
   * @param title string title of the message
   * @param body string body of the message
   */
  constructor(
    readonly from: string,
    readonly to: string,
    readonly title: string,
    readonly body: string,
  ) {}

  toString() {
    return `\nfrom: ${this.from}\nto: ${this.to}\ntitle: ${this.title}\nbody: ${this.body}`;
  }
}
