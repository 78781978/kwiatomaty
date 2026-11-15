(function(){
  "use strict";

  var htmlLang = document.documentElement.lang || "pl";
  var lang = "pl";
  if (htmlLang.indexOf("en") === 0) lang = "en";
  else if (htmlLang.indexOf("zh") === 0) lang = "zh";

  var path = window.location.pathname;
  var inSub = /\/(en|zh)\//.test(path);
  var contactHref = "kontakt.html";
  var offerHref = "oferta.html";
  if (lang === "en") { contactHref = "contact.html"; offerHref = "flower-vending-machines.html"; }
  else if (lang === "zh") { contactHref = "contact.html"; offerHref = "flower-vending-machines.html"; }

  var UI = {
    pl: {
      title: "VERO Asystent",
      subtitle: "Zapytaj o kwiatomaty i automaty",
      placeholder: "Napisz pytanie...",
      send: "Wyślij",
      greeting: "Cześć! Jestem asystentem VERO Vending Machines. Mogę odpowiedzieć na pytania o ceny, modele, dostawę, gwarancję i proces zamówienia. O co chcesz zapytać?",
      fallback: "Nie jestem pewna/pewien odpowiedzi na to pytanie. Najlepiej napisz bezpośrednio - odpowiem w ciągu 1 dnia roboczego.",
      fallbackCta: "Przejdź do formularza kontaktowego",
      quick: ["Ile kosztuje kwiatomat?", "Jak długo trwa dostawa?", "Jaka jest gwarancja?", "Jakie macie modele automatów?"],
      open: "Otwórz czat",
      close: "Zamknij czat",
      note: "Odpowiedzi oparte są na informacjach z tej strony. W razie wątpliwości napisz do nas bezpośrednio."
    },
    en: {
      title: "VERO Assistant",
      subtitle: "Ask about our vending machines",
      placeholder: "Type your question...",
      send: "Send",
      greeting: "Hi! I'm the VERO Vending Machines assistant. I can answer questions about pricing, models, delivery, warranty and the ordering process. What would you like to know?",
      fallback: "I'm not sure about the answer to that one. It's best to write to us directly - we reply within 1 business day.",
      fallbackCta: "Go to the contact form",
      quick: ["How much does a flower machine cost?", "How long does delivery take?", "What's the warranty?", "What machine models do you have?"],
      open: "Open chat",
      close: "Close chat",
      note: "Answers are based on information from this website. If in doubt, please contact us directly."
    },
    zh: {
      title: "VERO 助手",
      subtitle: "咨询我们的自动售货机",
      placeholder: "请输入您的问题...",
      send: "发送",
      greeting: "您好！我是 VERO 自动售货机的智能助手。我可以回答有关价格、机型、配送、保修及订购流程的问题。请问您想了解什么？",
      fallback: "这个问题我暂时无法确定答案。建议您直接与我们联系 - 我们会在1个工作日内回复。",
      fallbackCta: "前往联系表单",
      quick: ["鲜花售货机多少钱？", "配送需要多久？", "保修政策是什么？", "你们有哪些机型？"],
      open: "打开聊天",
      close: "关闭聊天",
      note: "以上回答基于本网站提供的信息。如有疑问，请直接与我们联系。"
    }
  }[lang];

  function kb(linkText) { return linkText; }

  var KB = {
    pl: [
      { kw: ["cena","cennik","kosztuje","koszt","ile kosztuje","wycena","zł","pln"],
        a: "Kwiatomaty 8-komorowe kosztują od 30 000 zł netto (model Compact). Modele Standard i Premium mają wycenę indywidualną - zależy od wyposażenia i kursu przy zamówieniu w fabryce. Pozostałe automaty (przekąskowe, napojowe, z jedzeniem, kosmetyczne, Blind Box) wyceniam indywidualnie po rozmowie o projekcie." },
      { kw: ["dostaw","czas realizacji","jak długo","ile trwa","termin"],
        a: "Pełne wdrożenie trwa zwykle 2-3 miesiące - od złożenia zamówienia w fabryce, przez transport i odprawę celną, po instalację i uruchomienie u Ciebie." },
      { kw: ["gwarancj","serwis","awari","naprawa"],
        a: "Każde urządzenie ma rok gwarancji fabrycznej oraz dożywotni serwis. Zapewniam kontakt serwisowy i gwarancyjny po stronie producenta." },
      { kw: ["model","rodzaj","jakie macie","oferta","co oferujecie","kategorie"],
        a: "Oferuję kwiatomaty (Compact, Standard, Premium) oraz automaty przekąskowe, z napojami, z jedzeniem, kosmetyczne i Blind Box - każdy z projektem wyglądu pod Twoją markę. Zobacz zakładkę \"Nasze maszyny\" w menu." },
      { kw: ["kwiatomat","kwiat","bukiet","kwiaciarnia"],
        a: "Kwiatomaty 8-komorowe są dostępne od 30 000 zł netto. Sprawdzają się w kwiaciarniach, pracowniach florystycznych, na stacjach paliw i w centrach handlowych - sprzedają świeże bukiety 24/7." },
      { kw: ["przekąsk","słodycz","snack","spiralow"],
        a: "Automaty przekąskowe to spiralowe maszyny na przekąski i słodycze - dostępne w wersji chłodzonej (21,5\" ekran) i w wersji przekąskowo-napojowej bez chłodzenia. Świetnie sprawdzają się w biurach, na uczelniach i w siłowniach." },
      { kw: ["napoj","napój","woda","picie","puszk"],
        a: "Automaty z napojami są chłodzone, dostępne w wersji 18,5\" (kompaktowa) i 21,5\" (kombinowana, napoje + przekąski). Dobrze sprawdzają się w siłowniach, na basenach i w biurowcach." },
      { kw: ["jedzeni","posiłek","danie","lunch"],
        a: "Automat z jedzeniem ma dwie niezależnie chłodzone komory - na gotowe dania, kanapki, sałatki i przekąski. Sprawdza się w zakładach pracy, na uczelniach i dworcach." },
      { kw: ["kosmetyk","beauty","paznokci","uroda"],
        a: "Automaty kosmetyczne są dostępne w wersji z witryną ekspozycyjną oraz w wersji spiralowej - na kosmetyki, akcesoria do paznokci i rzęs. Dobrze sprawdzają się w salonach beauty, siłowniach i centrach handlowych." },
      { kw: ["blind box","blindbox","figurk","gadżet","niespodziank"],
        a: "Automaty Blind Box sprzedają zapakowane niespodzianki - figurki i gadżety kolekcjonerskie, system push-rod. Mamy też inteligentną szafkę QR na 30 skrytek do wydawania zamówień." },
      { kw: ["kontakt","telefon","mail","email","zadzwoń","napisz","numer"],
        a: "Zadzwoń pod +48 880 088 150 lub napisz na info@siima.pl - odpowiadam zwykle w ciągu 1 dnia roboczego. Możesz też skorzystać z formularza kontaktowego." },
      { kw: ["adres","siedziba","michałowic","wasze biuro"],
        a: "Nasza siedziba i przykładowy kwiatomat znajdują się przy ul. Krakowskiej 150, 32-091 Michałowice." },
      { kw: ["godzin","otwarcia","kiedy czynne","sobota"],
        a: "Kontakt mailowy i telefoniczny: poniedziałek-piątek oraz sobota 11:00-15:00. W niedzielę nieczynne." },
      { kw: ["proces","jak to działa","jak zamówić","krok"],
        a: "Proces wygląda tak: 1) dobór modelu i projekt pod markę, 2) zamówienie w fabryce w Chinach, 3) transport i odprawa celna, 4) uruchomienie i szkolenie z obsługi. Zajmuję się każdym etapem." },
      { kw: ["leasing","rata","finansowani","zakup"],
        a: "Urządzenie można kupić lub wziąć w leasing - szczegóły finansowania ustalamy indywidualnie przy wycenie." },
      { kw: ["uzupełni","obsług","kto zajmuje się","napełni"],
        a: "Komory uzupełnia zwykle właściciel lokalizacji - w ramach szkolenia pokazuję, jak sprawnie to robić." },
      { kw: ["certyfikat","oznaczenie ce","norm","bezpieczeństw"],
        a: "Urządzenia spełniają wymagane w UE normy i certyfikaty (CE)." },
      { kw: ["fabryk","chin","producent","skąd"],
        a: "Współpracuję bezpośrednio z fabryką w Chinach na podstawie stałej umowy dystrybucyjnej - to sprawdzony producent, nie przypadkowe pośrednictwo w pojedynczych zamówieniach." },
      { kw: ["przepis","prawo","zezwoleni","legaln","formalnoś","sanepid"],
        a: "Automaty VERO spełniają wymagane w UE normy i certyfikaty (CE). W zależności od sprzedawanego asortymentu (np. żywność, kosmetyki) mogą obowiązywać dodatkowe lokalne wymogi sanitarne - pomagam sprawdzić, jakie formalności dotyczą Twojej lokalizacji i asortymentu." },
      { kw: ["postawić","ustawić automat","lokalizacj","gdzie można postawić","gdzie umieścić"],
        a: "Praktycznie wszędzie - centrum handlowe, stacja paliw, biurowiec, uczelnia, siłownia lub wejście do Twojego lokalu. Automaty są dostępne w wersji do pracy wewnątrz i na zewnątrz." },
      { kw: ["pojemność","ile sztuk","ile mieści","ile pomieści","ile produktów"],
        a: "Zależy od modelu i kategorii. Kwiatomaty mają 8 komór, a pozostałe automaty (przekąskowe, napojowe, z jedzeniem, kosmetyczne, Blind Box) mieszczą od około 180 do nawet 720 sztuk towaru, w zależności od konfiguracji." },
      { kw: ["zwraca się","zwróci się","zwrot inwestycji","inwestycj","roi","opłacaln","opłaca się"],
        a: "To zależy od modelu, lokalizacji i asortymentu. Mój własny kwiatomat zwrócił się w 6,3 miesiąca - dokładny czas zwrotu dla Twojego projektu wyliczę indywidualnie po rozmowie o lokalizacji i planowanej sprzedaży." },
      { kw: ["zdalnie","aplikacj","monitoring","zarządzać z telefonu"],
        a: "Tak, modele Standard i Premium mają zdalny monitoring i aplikację mobilną - sprawdzisz stan zapełnienia i sprzedaż bez wizyty przy urządzeniu." },
      { kw: ["dodatkowy pracownik","potrzebuję pracownika","obsługa automatu","kto obsługuje"],
        a: "Nie potrzebujesz dodatkowego pracownika - automaty VERO pracują w pełni samoobsługowo, 24/7. Uzupełnianie komór zajmuje zwykle kilkanaście minut dziennie." },
      { kw: ["cześć","hej","witaj","dzień dobry"],
        a: "Cześć! W czym mogę pomóc? Możesz zapytać o cenę, modele, dostawę lub gwarancję." }
    ],
    en: [
      { kw: ["price","cost","pricing","how much","pln","quote"],
        a: "8-chamber flower vending machines start at PLN 30,000 net (Compact model). Standard and Premium models are priced individually depending on equipment and the exchange rate at order time. Other machines (snack, drink, food, cosmetic, Blind Box) are quoted individually after discussing your project." },
      { kw: ["delivery","how long","lead time","shipping time","timeline"],
        a: "Full implementation usually takes 2-3 months - from the factory order, through shipping and customs clearance, to installation and launch at your location." },
      { kw: ["warranty","service","repair","breakdown"],
        a: "Every machine comes with a one-year factory warranty and lifetime service. I provide warranty and service contact on the manufacturer's side." },
      { kw: ["model","models","categories","what do you offer","range","types"],
        a: "I offer flower vending machines (Compact, Standard, Premium) plus snack, drink, food, cosmetic and Blind Box vending machines - each designed to match your brand. See \"Our Machines\" in the menu." },
      { kw: ["flower","bouquet","flowers","flower shop"],
        a: "8-chamber flower vending machines start at PLN 30,000 net. They work great in flower shops, floristry studios, petrol stations and shopping centres - selling fresh bouquets 24/7." },
      { kw: ["snack","sweets","spiral"],
        a: "Snack vending machines are spiral machines for snacks and sweets - available refrigerated (21.5\" screen) or as a snack & drink combo without cooling. Great for offices, universities and gyms." },
      { kw: ["drink","drinks","water","beverage"],
        a: "Drink vending machines are refrigerated, available in an 18.5\" compact version and a 21.5\" combined version (drinks + snacks). Work well in gyms, pools and office buildings." },
      { kw: ["food","meal","lunch"],
        a: "The food vending machine has two independently cooled chambers - for ready meals, sandwiches, salads and snacks. Works well in workplaces, universities and stations." },
      { kw: ["cosmetic","beauty","nail","makeup"],
        a: "Cosmetic vending machines come with a display showcase or a spiral cabinet - for cosmetics and nail/lash accessories. Great for beauty salons, gyms and shopping centres." },
      { kw: ["blind box","blindbox","figure","gadget","surprise"],
        a: "Blind Box vending machines sell packaged surprises - figures and collectible gadgets, with a push-rod system. We also have a smart QR locker with 30 compartments for order pickup." },
      { kw: ["contact","phone","email","call","number"],
        a: "Call +48 880 088 150 or email info@siima.pl - I usually reply within 1 business day. You can also use the contact form." },
      { kw: ["address","your office","headquarters","where are you based"],
        a: "Our office and a sample flower vending machine are located at Krakowska 150, 32-091 Michalowice, Poland." },
      { kw: ["hours","open","saturday","when"],
        a: "Email and phone contact: Monday-Friday, plus Saturday 11:00 AM-3:00 PM. Closed on Sunday." },
      { kw: ["process","how does it work","how to order","steps"],
        a: "The process: 1) model selection and brand design, 2) factory order in China, 3) shipping and customs clearance, 4) launch and operator training. I handle every step." },
      { kw: ["leasing","financing","installment","buy"],
        a: "You can buy the machine outright or lease it - financing details are arranged individually with the quote." },
      { kw: ["restock","refill","who operates","who maintains"],
        a: "The location owner usually restocks the chambers - as part of training, I show how to do it efficiently." },
      { kw: ["certificate","certification","ce mark","safety standard"],
        a: "The machines meet the required EU standards and certifications (CE)." },
      { kw: ["factory","china","manufacturer","where from"],
        a: "I work directly with a factory in China under a standing distribution agreement - a proven manufacturer, not casual brokering of one-off orders." },
      { kw: ["regulation","legal","permit","compliance","sanitary"],
        a: "VERO machines meet the required EU standards and certifications (CE). Depending on the assortment sold (e.g. food, cosmetics), additional local sanitary requirements may apply - I help you check what formalities apply to your location and assortment." },
      { kw: ["place the machine","place a machine","put the machine","install the machine","install a machine","site a machine","where can i put","where should i place"],
        a: "Practically anywhere - a shopping centre, petrol station, office building, university, gym, or the entrance to your venue. The machines are available in indoor and outdoor versions." },
      { kw: ["capacity","how many items","how many products","hold"],
        a: "It depends on the model and category. Flower machines have 8 chambers, while other machines (snack, drink, food, cosmetic, Blind Box) hold from about 180 to 720 items, depending on the configuration." },
      { kw: ["pay for itself","payback","roi","return on investment","profitable"],
        a: "It depends on the model, location and assortment. My own flower machine paid for itself in 6.3 months - I'll calculate the exact payback period for your project individually." },
      { kw: ["remotely","remote app","mobile app","manage from phone"],
        a: "Yes, Standard and Premium models have remote monitoring and a mobile app - you can check stock levels and sales without visiting the machine." },
      { kw: ["extra employee","need staff","who operates the machine","additional worker"],
        a: "You don't need an extra employee - VERO machines are fully self-service, 24/7. Restocking the chambers usually takes just a few minutes a day." },
      { kw: ["hi","hello","hey"],
        a: "Hi! How can I help? You can ask about pricing, models, delivery or warranty." }
    ],
    zh: [
      { kw: ["价格","多少钱","报价","费用","成本"],
        a: "8格鲜花自动售货机（紧凑型）起价30,000兹罗提（净价）。标准型与高级型根据配置及下单时汇率单独报价。其他机型（零食、饮料、餐食、美妆、盲盒）将在了解您的项目后单独报价。" },
      { kw: ["配送","多久","交付时间","运输时间","周期"],
        a: "完整实施流程通常需要2-3个月 - 从工厂下单，经运输和清关，到安装调试并投入使用。" },
      { kw: ["保修","维护","维修","故障"],
        a: "每台设备均享有一年厂商保修及终身维护服务。我会负责与制造商方面的保修和售后联络。" },
      { kw: ["型号","机型","种类","产品","有哪些"],
        a: "我们提供鲜花自动售货机（紧凑型、标准型、高级型），以及零食、饮料、餐食、美妆和盲盒自动售货机 - 均可按您的品牌定制外观。详情请查看菜单中的“我们的机器”。" },
      { kw: ["鲜花","花束","花店"],
        a: "8格鲜花自动售货机起价30,000兹罗提（净价）。适合花店、花艺工作室、加油站及购物中心 - 全天候销售新鲜花束。" },
      { kw: ["零食","糖果","螺旋"],
        a: "零食自动售货机为螺旋式设计，提供冷藏款（21.5寸屏幕）及常温零食饮料组合款。适合办公楼、高校及健身房。" },
      { kw: ["饮料","水","瓶装"],
        a: "饮料自动售货机为冷藏式，提供18.5寸紧凑款及21.5寸饮料零食组合款。适合健身房、泳池及写字楼。" },
      { kw: ["餐食","用餐","午餐"],
        a: "餐食自动售货机配备两个独立制冷仓 - 可存放即食餐品、三明治、沙拉及零食。适合工作场所、高校及车站。" },
      { kw: ["美妆","化妆品","美甲"],
        a: "美妆自动售货机提供展示柜款及螺旋柜款 - 适合销售化妆品及美甲美睫配件。适合美容沙龙、健身房及购物中心。" },
      { kw: ["盲盒","手办","惊喜","周边"],
        a: "盲盒自动售货机销售封装好的惊喜礼品 - 手办与收藏类周边，采用推杆（push-rod）系统。我们还提供带30个格口的智能二维码取件柜。" },
      { kw: ["联系","电话","邮箱","致电","号码"],
        a: "请致电 +48 880 088 150 或发送邮件至 info@siima.pl - 我通常会在1个工作日内回复。您也可以使用联系表单。" },
      { kw: ["地址","办公室","总部"],
        a: "我们的办公地址及一台展示鲜花售货机位于：波兰 32-091 米哈沃维采 克拉科夫斯卡街150号。" },
      { kw: ["时间","营业","周六","几点"],
        a: "邮件及电话联系时间：周一至周五，另加周六 11:00-15:00。周日休息。" },
      { kw: ["流程","怎么运作","如何订购","步骤"],
        a: "合作流程：1）选型与品牌设计，2）向中国工厂下单，3）运输与清关，4）启用与操作培训。我会全程负责每个环节。" },
      { kw: ["租赁","分期","融资","购买"],
        a: "设备可选择一次性购买或租赁 - 具体融资方案将在报价时单独商定。" },
      { kw: ["补货","谁负责","运营","维护人员"],
        a: "通常由场地所有者负责补货 - 培训中我会示范如何高效完成补货。" },
      { kw: ["ce认证","认证","标准","安全"],
        a: "设备符合欧盟相关标准及CE认证要求。" },
      { kw: ["工厂","中国","制造商","来源"],
        a: "我与中国工厂建立了长期经销协议关系 - 是可靠的制造商，而非随意的单次代购。" },
      { kw: ["法规","合规","许可","卫生要求","是否合法"],
        a: "VERO 设备符合欧盟相关标准及CE认证要求。根据所售产品类型（如食品、化妆品），可能适用额外的当地卫生要求 - 我会协助您确认具体场地与产品所需的手续。" },
      { kw: ["安装在哪","可以放在哪","放置地点","适合安装"],
        a: "几乎任何地方都可以 - 购物中心、加油站、写字楼、高校、健身房，或您店铺的入口处。设备提供室内及室外两种版本。" },
      { kw: ["能装多少","容量","最多能放","商品数量"],
        a: "取决于机型与类别。鲜花自动售货机有8个仓格，其他机型（零食、饮料、餐食、美妆、盲盒）根据配置可容纳约180至720件商品。" },
      { kw: ["回本","投资回收","roi","多久能回本","划算吗"],
        a: "这取决于机型、地点与产品类型。我自己的鲜花自动售货机用了6.3个月回本 - 具体回收期我会为您单独计算。" },
      { kw: ["远程","手机应用","远程管理","app管理"],
        a: "可以，标准型与高级型设备配备远程监控与手机应用，无需亲自到场即可查看库存与销售情况。" },
      { kw: ["需要员工","额外人手","谁来操作","需要雇人吗"],
        a: "不需要额外员工 - VERO 自动售货机全天候全自助运行。补货每天通常只需几分钟。" },
      { kw: ["你好","您好","嗨"],
        a: "您好！有什么可以帮您？您可以咨询价格、机型、配送或保修相关问题。" }
    ]
  }[lang];

  function normalize(s) {
    return s.toLowerCase();
  }

  function findAnswer(text) {
    var q = normalize(text);
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      var score = 0;
      for (var j = 0; j < entry.kw.length; j++) {
        if (q.indexOf(entry.kw[j]) !== -1) score++;
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore > 0 ? best.a : null;
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function(c) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  function init() {
    var wrap = el("div", "vero-chat");
    wrap.innerHTML =
      '<button type="button" class="vero-chat-fab" aria-label="' + UI.open + '">' +
        '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.8 8.8 0 0 1-3.1-.6L3 21l1.8-5.1a8.3 8.3 0 0 1-.8-3.6A8.4 8.4 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z"/></svg>' +
      '</button>' +
      '<div class="vero-chat-panel" role="dialog" aria-label="' + UI.title + '">' +
        '<div class="vero-chat-head">' +
          '<div><strong>' + UI.title + '</strong><span>' + UI.subtitle + '</span></div>' +
          '<button type="button" class="vero-chat-close" aria-label="' + UI.close + '">&times;</button>' +
        '</div>' +
        '<div class="vero-chat-body" id="vero-chat-body"></div>' +
        '<div class="vero-chat-quick" id="vero-chat-quick"></div>' +
        '<form class="vero-chat-form" id="vero-chat-form">' +
          '<input type="text" id="vero-chat-input" placeholder="' + UI.placeholder + '" autocomplete="off">' +
          '<button type="submit">' + UI.send + '</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(wrap);

    var fab = wrap.querySelector(".vero-chat-fab");
    var panel = wrap.querySelector(".vero-chat-panel");
    var closeBtn = wrap.querySelector(".vero-chat-close");
    var body = wrap.querySelector("#vero-chat-body");
    var quick = wrap.querySelector("#vero-chat-quick");
    var form = wrap.querySelector("#vero-chat-form");
    var input = wrap.querySelector("#vero-chat-input");

    function addMsg(text, who) {
      var m = el("div", "vero-msg vero-msg-" + who, text);
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }

    function addFallback() {
      var m = el("div", "vero-msg vero-msg-bot", escapeHtml(UI.fallback) +
        '<br><a href="' + contactHref + '" class="vero-fallback-link">' + UI.fallbackCta + ' &rarr;</a>');
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }

    function respond(text) {
      addMsg(escapeHtml(text), "user");
      var answer = findAnswer(text);
      window.setTimeout(function() {
        if (answer) addMsg(escapeHtml(answer), "bot");
        else addFallback();
      }, 350);
    }

    var started = false;
    function openPanel() {
      panel.classList.add("open");
      fab.setAttribute("aria-expanded", "true");
      if (!started) {
        started = true;
        addMsg(escapeHtml(UI.greeting), "bot");
        var note = el("div", "vero-msg vero-msg-note", escapeHtml(UI.note));
        body.appendChild(note);
        UI.quick.forEach(function(q) {
          var chip = el("button", "vero-chip", escapeHtml(q));
          chip.type = "button";
          chip.addEventListener("click", function() { respond(q); });
          quick.appendChild(chip);
        });
      }
      input.focus();
    }
    function closePanel() {
      panel.classList.remove("open");
      fab.setAttribute("aria-expanded", "false");
    }

    fab.addEventListener("click", function() {
      if (panel.classList.contains("open")) closePanel(); else openPanel();
    });
    closeBtn.addEventListener("click", closePanel);
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      respond(v);
      input.value = "";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
