import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const resolveResult = (obj: any) => {
  return {
    code: 0,
    msg: "success",
    data: obj,
    requestId: Mock.Random.id(),
    date: Mock.Random.date(),
  };
};

export default [
  {
    url: "/front/user/exist/email",
    method: "get",
    response: () => {
      return resolveResult({
        fetchGoogle: false,
        data: false,
      });
    },
  },
  {
    url: "/front/verify-code/send",
    method: "post",
    response: () => {
      return resolveResult(true);
    },
  },
  {
    url: "/front/user/register/email",
    method: "post",
    response: () => {
      return resolveResult({
        userId: 1,
        nickname: "user 0",
        avatar: "",
        email: "11@qq.com",
        token: "12312312312313",
      });
    },
  },
  {
    url: "/front/games/all",
    method: "post",
    response: () => {
      return resolveResult({
        records: [
          {
            gameId: 1,
            gameName: "Genshin Impact",
            spine: {
              json: "./src/assets/spine/yifuna.json",
              atlas: "./src/assets/spine/yifuna.atlas",
              png: "./src/assets/spine/yifuna.png",
            },
            frontBgImage: "./src/assets/background/yuanshenFrontBg.png",
            behindBgImage: "./src/assets/background/yuanshenBehindBg.png",
            code: "yuanshen",
            maxDiscount: 15,
            iconUrl:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
          },
          {
            gameId: 2,
            gameName: "Zenless Zone Zero",
            spine: {
              json: "./src/assets/spine/bili.json",
              atlas: "./src/assets/spine/bili.atlas",
              png: "./src/assets/spine/bili.png",
            },
            frontBgImage: "./src/assets/background/juequlingFrontBg.png",
            behindBgImage: "./src/assets/background/juequlingBehindBg.png",
            code: "juequling",
            maxDiscount: 30,
            iconUrl:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
          },
          {
            gameId: 3,
            gameName: "Honkai: Star Rail",
            // Reusing yifuna for the third game for now as we only have 2 sets
            spine: {
              json: "./src/assets/spine/yifuna.json",
              atlas: "./src/assets/spine/yifuna.atlas",
              png: "./src/assets/spine/yifuna.png",
            },
            frontBgImage: "./src/assets/background/benghuaiFrontBg.png",
            behindBgImage: "./src/assets/background/benghuaiBehindBg.png",
            code: "benghuai",
            maxDiscount: 25,
            iconUrl:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
          },
          {
            gameId: 4,
            gameName: "League of Legend",
            spine: {
              json: "./src/assets/spine/bili.json",
              atlas: "./src/assets/spine/bili.atlas",
              png: "./src/assets/spine/bili.png",
            },
            frontBgImage: "./src/assets/background/benghuaiFrontBg.png",
            behindBgImage: "./src/assets/background/benghuaiBehindBg.png",
            code: "yxlm",
            maxDiscount: 25,
            iconUrl:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
          },
          {
            gameId: 5,
            gameName: "PUBG Mobile",
            spine: {
              json: "./src/assets/spine/bili.json",
              atlas: "./src/assets/spine/bili.atlas",
              png: "./src/assets/spine/bili.png",
            },
            frontBgImage: "./src/assets/background/benghuaiFrontBg.png",
            behindBgImage: "./src/assets/background/benghuaiBehindBg.png",
            code: "pubgm",
            maxDiscount: 25,
            iconUrl:
              "https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=64&q=80",
          },
          {
            gameId: 6,
            gameName: "Marvel Rivals",
            spine: {
              json: "./src/assets/spine/bili.json",
              atlas: "./src/assets/spine/bili.atlas",
              png: "./src/assets/spine/bili.png",
            },
            frontBgImage: "./src/assets/background/benghuaiFrontBg.png",
            behindBgImage: "./src/assets/background/benghuaiBehindBg.png",
            code: "marvelrivals",
            maxDiscount: 25,
            iconUrl:
              "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=64&q=80",
          },
          {
            gameId: 7,
            gameName: "Wuthering Waves",
            spine: {
              json: "./src/assets/spine/bili.json",
              atlas: "./src/assets/spine/bili.atlas",
              png: "./src/assets/spine/bili.png",
            },
            frontBgImage: "./src/assets/background/benghuaiFrontBg.png",
            behindBgImage: "./src/assets/background/benghuaiBehindBg.png",
            code: "ww",
            maxDiscount: 25,
            iconUrl:
              "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=64&q=80",
          },
        ],
        total: 80,
      });
    },
  },
  {
    url: "/front/games/hot",
    method: "get",
    response: () => {
      return resolveResult([
        {
          gameId: 1,
          gameName: "Genshin Impact",
          spine: {
            json: "./src/assets/spine/yifuna.json",
            atlas: "./src/assets/spine/yifuna.atlas",
            png: "./src/assets/spine/yifuna.png",
          },
          frontBgImage: "./src/assets/background/yuanshenFrontBg.png",
          behindBgImage: "./src/assets/background/yuanshenBehindBg.png",
          code: "yuanshen",
          maxDiscount: 15,
          iconUrl:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
        },
        {
          gameId: 2,
          gameName: "Zenless Zone Zero",
          spine: {
            json: "./src/assets/spine/bili.json",
            atlas: "./src/assets/spine/bili.atlas",
            png: "./src/assets/spine/bili.png",
          },
          frontBgImage: "./src/assets/background/juequlingFrontBg.png",
          behindBgImage: "./src/assets/background/juequlingBehindBg.png",
          code: "juequling",
          maxDiscount: 30,
          iconUrl:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
        },
        {
          gameId: 3,
          gameName: "Honkai: Star Rail",
          // Reusing yifuna for the third game for now as we only have 2 sets
          spine: {
            json: "./src/assets/spine/yifuna.json",
            atlas: "./src/assets/spine/yifuna.atlas",
            png: "./src/assets/spine/yifuna.png",
          },
          frontBgImage: "./src/assets/background/benghuaiFrontBg.png",
          behindBgImage: "./src/assets/background/benghuaiBehindBg.png",
          code: "benghuai",
          maxDiscount: 25,
          iconUrl:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
        },
      ]);
    },
  },
  {
    url: "/front/games/detail",
    method: "get",
    response: () => {
      return resolveResult({
        gameId: 1,
        gameName: "Genshin Impact",
        spine: {
          json: "./src/assets/spine/yifuna.json",
          atlas: "./src/assets/spine/yifuna.atlas",
          png: "./src/assets/spine/yifuna.png",
        },
        frontBgImage: "./src/assets/background/yuanshenFrontBg.png",
        behindBgImage: "./src/assets/background/yuanshenBehindBg.png",
        code: "yuanshen",
        maxDiscount: 15,
        iconUrl:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
        skuList: [
          {
            id: 1,
            goodsId: 1,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 2,
            goodsId: 2,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 3,
            goodsId: 3,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 4,
            goodsId: 4,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          // Row 2
          {
            id: 5,
            goodsId: 5,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 6,
            goodsId: 6,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 7,
            goodsId: 7,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 8,
            goodsId: 8,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          // Row 3 (partial to match image approximately or just fill grid)
          {
            id: 9,
            goodsId: 9,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: false,
          },
          {
            id: 10,
            goodsId: 10,
            goodsName: "Zenless Zone Zero",
            skuNames: "Zenless Zone Zero",
            skuImg: "./src/assets/gameItems/gameitem1.svg",
            originalPrice: 234,
            bubblePrice: 260.9,
            discount: 22,
            currency: "$",
            zoneInfo: "US",
            hasSpecialOffer: true,
          },
        ],
      });
    },
  },
  {
    url: "/front/profile/achievements",
    method: "get",
    response: () => {
      return resolveResult([
        {
          id: 1,
          achievementName: "Achievement 1",
          achievementIcon: "./src/assets/userPanel/achievementImg.png",
          achievementDescription: "Description 1",
        },
        {
          id: 2,
          achievementName: "Achievement 2",
          achievementIcon: "./src/assets/userPanel/achievementImg.png",
          achievementDescription: "Description 2",
        },
        {
          id: 3,
          achievementName: "Achievement 3",
          achievementIcon: "./src/assets/userPanel/achievementImg.png",
          achievementDescription: "Description 3",
        },
      ]);
    },
  },
  {
    url: "/front/profile/me",
    method: "get",
    response: () => {
      return resolveResult({
        userId: 1,
        nickname: "User 1",
        email: "user1@example.com",
        avatar: "./src/assets/avatars/user.jpg",
        gender: "Male",
        birthday: "2023-01-01",
        inviteCode: "INVITE123",
        channelName: "Channel 1",
        thirdPartyType: "Google",
      });
    },
  },
  {
    url: "/front/orders/list",
    method: "get",
    response: () => {
      return resolveResult([
        {
          orderId: 1,
          orderNo: "1234567890",
          gameName: "Game 1",
          skuName: "SKU 1",
          skuImage: "./src/assets/gameItems/gameitem1.svg",
          quantity: 1,
          orderAmount: 123,
          status: "COMPLETED",
          statusDesc: "Success",
          createTime: "2022-01-01 12:00:00",
        },
      ]);
    },
  },
  {
    url: "/front/orders/detail",
    method: "get",
    response: () => {
      return resolveResult({
        orderId: 1,
        orderNo: "1234567890",
        gameName: "Game 1",
        skuName: "SKU 1",
        skuImage: "./src/assets/gameItems/gameitem1.svg",
        quantity: 1,
        gameUid: "1234567890",
        gameServer: "1234567890",
        paymentMethod: "银联充值",
        originalPrice: 123,
        platformPrice: 123,
        discountAmount: 123,
        orderAmount: 123,
        status: "COMPLETED",
        statusDesc: "Success",
        createTime: "2022-01-01 12:00:00",
        payTime: "2022-01-01 12:00:00",
        completeTime: "2022-01-01 12:00:00",
        remainingPaySeconds: 123,
      });
    },
  },
  {
    url: "/front/profile/coupons",
    method: "get",
    response: () => {
      return resolveResult([
        {
          id: 1,
          couponCode: "111",
          couponName: "111",
          couponType: "111",
          discountValue: 111,
          minOrderAmount: 111,
          maxDiscountAmount: 111,
          validFrom: "2022-01-01 12:00:00",
          validTo: "2022-01-01 12:00:00",
          status: 0,
          statusDesc: "",
          rules: "",
          source: "",
          remainingSeconds: 3000,
          available: true,
        },
        {
          id: 2,
          couponCode: "111",
          couponName: "111",
          couponType: "111",
          discountValue: 111,
          minOrderAmount: 111,
          maxDiscountAmount: 111,
          validFrom: "2022-01-01 12:00:00",
          validTo: "2022-01-01 12:00:00",
          status: 0,
          statusDesc: "",
          rules: "",
          source: "",
          remainingSeconds: 30,
          available: true,
        },
        {
          id: 3,
          couponCode: "111",
          couponName: "111",
          couponType: "111",
          discountValue: 111,
          minOrderAmount: 111,
          maxDiscountAmount: 111,
          validFrom: "2022-01-01 12:00:00",
          validTo: "2022-01-01 12:00:00",
          status: 0,
          statusDesc: "",
          rules: "",
          source: "",
          remainingSeconds: 30,
          available: false,
        },
      ]);
    },
  },
] as MockMethod[];
