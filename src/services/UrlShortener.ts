import moleculer, { Context } from "moleculer";
import { Action, Service } from "moleculer-decorators";
import ShortId from "../models/ShortId";

@Service()
class UrlShortener extends moleculer.Service {
  @Action({
    params: {
      shortId: "string",
    },
  })
  async get({ params }: Context<{ shortId: string }>) {
    const document = await ShortId.findOne({ shortId: params.shortId });

    if (document) {
      return {
        error: null,
        data: {
          originalUrl: document.originalUrl,
        },
      };
    }

    return {
      error: {
        code: 404,
        response: {
          message: "Error: Not found, just like my will to live",
        },
      },
      data: null,
    };
  }

  @Action({
    params: {
      originalUrl: "string",
    },
  })
  async set({ params }: Context<{ originalUrl: string }>) {
    const document = await ShortId.findOne({ originalUrl: params.originalUrl });

    if (document) {
      return {
        error: null,
        data: {
          shortId: document.shortId,
        },
      };
    }

    const shortId = (
      Date.now() + (Math.random() < 0.5 ? Math.random() : -Math.random())
    ).toString(36);

    await ShortId.create({ shortId, originalUrl: params.originalUrl });

    return {
      error: null,
      data: {
        shortId,
      },
    };
  }
}

export default UrlShortener;
