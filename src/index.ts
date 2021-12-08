import moleculer, { Context } from "moleculer";
import { Action, Service } from "moleculer-decorators";

const broker = new moleculer.ServiceBroker({
  transporter: "nats",
});

@Service()
class ServiceName extends moleculer.Service {
  @Action({
    params: {
      a: "number",
      b: "number",
    },
  })
  sum({ params }: Context<{ a: number; b: number }>) {
    return params.a + params.b;
  }
}

broker.createService(ServiceName);

broker.start().catch((e) => {
  throw e;
});
