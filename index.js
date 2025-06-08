const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const mongoose = require('mongoose');


const app = new Koa();
const router = new Router();

mongoose.connect('mongodb://localhost:27017/koaDemo', {
})
.then(() => {console.log('MongoDB connected successfully');})
.catch(err => {console.error('MongoDB connection error:', err);});


const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email:String
});


// 创建模型
// 注意：mongoose.model() 的第一个参数是模型名，第二个参数是集合名
const User = mongoose.model('users',userSchema); // 'users' 是集合名

app.use(koaBody({
    json: true, // 解析 JSON
    form: true, // 解析表单
    multipart: true // 文件上传
}));

// 响应
app.use(router.routes()).use(router.allowedMethods());
router.get('/', async (ctx) => {
    ctx.body = 'Welcome to the Credit Letter Comparison API';
});

router.get('/users', async (ctx) => {
    try {
        const users = await User.find(); // 查询所有用户
        ctx.status = 200; // 设置状态码为 200 OK
        // ctx.header['access-control-allow-origin'] = '*';
        const res = {
            data: users,
            message: 'Users fetched successfully',
            code: 200
        }
        ctx.body = res;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to fetch users' };
    }
    })
    .get('/users/:id', async (ctx) => {
        ctx.body = `User: ${ctx.params.id}`;
    })
    .post('/users', async (ctx) => {

        try {
            console.log(ctx.request.body);
            const { name, age, email } = ctx.request.body;
            const user = new User({ name, age, email });
            console.log("user:", user);
            await user.save();
            
        // ctx.header['access-control-allow-origin'] = '*';
        // ctx.header['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        // ctx.header['access-control-allow-headers'] = 'Content-Type, Authorization';
        // ctx.header['access-control-expose-headers'] = 'Content-Length, X-JSON';
            ctx.body = 'Create user successfully';
            ctx.status = 201; // 设置状态码为 201 Created
            
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to create user' };
            return;
            
        }
       
    })
    .get("/json", (ctx) => {
        ctx.response.type = 'json';
        ctx.response.body = {
            "compare_result": [
                {
                    "description": "",
                    "信用证号码": "8524011689"
                },
                {
                    "description": "",
                    "信用证开证日期": "2024 Jun 19"
                },
                {
                    "description": "校验失败，日期格式解析失败",
                    "信用证到期日": "2024 Sep 16"
                },
                {
                    "description": "",
                    "信用证到期地点": "HONG KONG"
                },
                {
                    "description": "校验失败，形式发票申请人名称为空",
                    "信用证开证申请人名称": "TECHNO MEDICAL SYSTEM"
                },
                {
                    "description": "校验失败，形式发票申请人地址为空",
                    "信用证开证申请人地址": "HOUSE NO-16(2ND FLOOR),ROAD NO-02, SHAYMOLI,SHER-E-BANGLA NAGAR,PS,DEHRA-1207, BANGLADESH."
                },
                {
                    "description": "",
                    "开证申请人银行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "开证申请人银行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "代办行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "代办行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "偿付行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "偿付行账号": "76424"
                },
                {
                    "description": "",
                    "偿付语句": "BY NEGOTIATION"
                },
                {
                    "description": "",
                    "偿付行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "校验失败，形式发票Payment Instruction为空",
                    "转通知行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "转通知行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "校验通过",
                    "信用证受益人名称": "MR GLOBAL (HK) LIMITED"
                },
                {
                    "description": "校验失败，信用证受益人地址FLAT/RM 1115-6 BLOCK 1, 117F, GRAND CENTURY PLACE 193 PRINCE SEE FIELD 47A, PI受益人地址9/F,Bank of China Tower,1 GardenRoad,HongKong",
                    "信用证受益人地址": "FLAT/RM 1115-6 BLOCK 1, 117F, GRAND CENTURY PLACE 193 PRINCE SEE FIELD 47A"
                },
                {
                    "description": "校验通过",
                    "信用证币种": "USD"
                },
                {
                    "description": "校验通过",
                    "信用证金额": "76424"
                },
                {
                    "description": "校验失败，信用证金额3.00%, PI金额76424",
                    "信用证金额上浮": "3.00%"
                },
                {
                    "description": "校验失败，信用证金额0.00%, PI金额76424",
                    "信用证金额下浮": "0.00%"
                },
                {
                    "description": "校验失败，形式发票议付行为空",
                    "议付行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "议付行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "信用证兑付方式": "BY NEGOTIATION"
                },
                {
                    "description": "校验失败，用证汇票付款人和信用证开证行名址不一致",
                    "信用证汇票付款人": "BRAC BANK PLC"
                },
                {
                    "description": "",
                    "信用证汇票付款行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "信用证汇票付款行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "校验成功",
                    "信用证分批装运": "ALLOWED"
                },
                {
                    "description": "校验成功",
                    "信用证转运": "ALLOWED"
                },
                {
                    "description": "",
                    "信用证收货地": "HONG KONG"
                },
                {
                    "description": "校验失败，信用证转运不是ANY CHINA OR HONG KONG PORT/AIRPORT,需要人工确认",
                    "信用证装货港口/始发航空港": "ANY SEA PORT OF CHINA/HONG KONG"
                },
                {
                    "description": "",
                    "信用证卸货港/航空目的港": "CHATTOGRAM, BANGLADESH"
                },
                {
                    "description": "",
                    "信用证目的地": "BANGLADESH"
                },
                {
                    "description": "校验失败，日期格式解析失败",
                    "信用证最迟装运日期": "2024 Aug 26"
                },
                {
                    "description": "",
                    "信用证原产地描述": "HONG KONG"
                },
                {
                    "description": "",
                    "信用证贸易术语": "CIF BANGLADESH"
                },
                {
                    "description": "",
                    "信用证贸易术语出处": "INCOTERMS 2020"
                },
                {
                    "description": "",
                    "信用证货物描述": "2163B-CTO-S01 CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM WITH STANDARD ACCESSORIES, 2163B-CTO-S01 CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM WITH STANDARD ACCESSORIES, 2167D-CTO-S01 DC-28 DIAGNOSTIC ULTRASOUND SYSTEM WITH STANDARD ACCESSORIES"
                },
                {
                    "description": "",
                    "信用证货物描述_货物名称": "CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM"
                },
                {
                    "description": "",
                    "信用证货物描述_货物型号": "2163B-CTO-S01, 2163B-CTO-S01, 2167D-CTO-S01"
                },
                {
                    "description": "",
                    "信用证货物描述_货物数量": "11,000 KG"
                },
                {
                    "description": "",
                    "信用证货物描述_货物单价": "USD 14.10/KG"
                },
                {
                    "description": "",
                    "信用证货物描述_货物金额": "USD 155,100"
                },
                {
                    "description": "",
                    "信用证货物描述_货物规格": "NVP 801 GLOSS"
                },
                {
                    "description": "",
                    "信用证货物描述_货物毛重": "22,000 KG"
                },
                {
                    "description": "",
                    "信用证货物描述_货物净重": "22,000 KG"
                },
                {
                    "description": "",
                    "信用证货物描述_货物体积": "2835 m3"
                },
                {
                    "description": "",
                    "信用证货物描述_货物尺寸": "1.02X50"
                },
                {
                    "description": "",
                    "信用证货物描述_货物等级": "Grade"
                },
                {
                    "description": "",
                    "信用证货物数量汇总": "22,000 KG"
                },
                {
                    "description": "",
                    "信用证货物金额汇总": "USD 298,100"
                },
                {
                    "description": "",
                    "信用证货物净重汇总": "22,000 KG"
                },
                {
                    "description": "",
                    "信用证货物毛重汇总": "22,000 KG"
                },
                {
                    "description": "",
                    "信用证货物尺寸汇总": "2835 m3"
                },
                {
                    "description": "",
                    "信用证货物包装件数汇总": "1"
                },
                {
                    "description": "",
                    "货物品种": "CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM"
                },
                {
                    "description": "",
                    "信用证唛头": "MR GLOBAL (HK) LIMITED"
                },
                {
                    "description": "",
                    "信用证合同号": "8524011689"
                },
                {
                    "description": "",
                    "信用证签署要求": "SIGNED COMMERCIAL INVOICE IN TWO FOLDS"
                },
                {
                    "description": "",
                    "信用证手签要求": "MANUALLY SIGNED INVOICE IN TWO FOLDS"
                },
                {
                    "description": "",
                    "信用证发票金额拆分要求": "SHOWING FOB VALUE OF GOODS AND FREIGHT CHARGE SEPERATELY"
                },
                {
                    "description": "",
                    "信用证单据名称": "COMMERCIAL INVOICE"
                },
                {
                    "description": "",
                    "信用证单据份数要求": "1"
                },
                {
                    "description": "",
                    "信用证提单正本寄出要求": "1/3 ORIGINAL B/L TO BE SENT TO THE APPLICANT BY BENE DIRECTLY"
                },
                {
                    "description": "",
                    "信用证运费要求": "FREIGHT CHARGE"
                },
                {
                    "description": "",
                    "信用证背书要求": "BLANK ENDORSED"
                },
                {
                    "description": "",
                    "信用证注明要求": "CERTIFYING THAT THE GOODS HEREIN INVOICED CONFORM TO PROFORMA INVOICE ISSUED BY THE BENEFICIARY"
                },
                {
                    "description": "",
                    "信用证空白抬头要求": "CONSIGNEE"
                },
                {
                    "description": "",
                    "信用证指示抬头要求": "TO ORDER OF APPLICANT"
                },
                {
                    "description": "",
                    "信用证保险单金额要求": "USD 57,50"
                },
                {
                    "description": "",
                    "信用证保险单承保险别": "CARGO"
                },
                {
                    "description": "",
                    "信用证保险理赔地点": "BANGLADESH"
                },
                {
                    "description": "",
                    "信用证保险偿付机构": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "信用证保险不计免赔": "IRRESPECTIVE OF PERCENTAGE"
                },
                {
                    "description": "",
                    "信用证被保险人要求": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "信用证产地证格式": "CERTIFICATE OF ORIGIN FORM E IN 2 COPIES"
                },
                {
                    "description": "",
                    "信用证产地证出具人要求": "CHAMBER OF COMMERCE"
                },
                {
                    "description": "",
                    "信用证货物产地要求": "CHINA"
                },
                {
                    "description": "",
                    "信用证汇票金额要求": "80% OF INVOICE VALUE"
                },
                {
                    "description": "校验失败，用证汇票付款人和信用证开证行名址不一致",
                    "信用证汇票付款人条款": "DRAWEE"
                },
                {
                    "description": "",
                    "单据要求": "ALL DOCS MUST INDICATE LC NO. AND NAME OF LC ISSUING BANK."
                },
                {
                    "description": "校验失败，信用证金额MORE OR LESS, PI金额76424",
                    "信用证金额要求": "MORE OR LESS"
                },
                {
                    "description": "",
                    "信用证文件语言要求": "ENGLISH"
                },
                {
                    "description": "",
                    "信用证受益人信息要求": "BENEFICIARY"
                },
                {
                    "description": "",
                    "信用证开证行信息要求": "ISSUING BANK"
                },
                {
                    "description": "",
                    "信用证申请人信息要求": "TECHNO MEDICAL SYSTEM"
                },
                {
                    "description": "",
                    "信用证所有单据标注要求": "ALL DOCS MUST INDICATE LC NO. AND NAME OF LC ISSUING BANK."
                },
                {
                    "description": "",
                    "信用证商品编码": "5208390020"
                },
                {
                    "description": "",
                    "发报行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "发报行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "收报行SWIFT CODE": "BRCKBDHXXX"
                },
                {
                    "description": "",
                    "收报行名称地址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "",
                    "信用证数量浮动百分比": "3.00%"
                },
                {
                    "description": "",
                    "信用证数量下浮": "0.00%"
                },
                {
                    "description": "",
                    "附加条款": "BENEFICIARY DRAFTS AT SIGHT"
                },
                {
                    "description": "",
                    "国家": "HK"
                },
                {
                    "description": "",
                    "收费帐号": "null"
                },
                {
                    "description": "",
                    "联系人": "null"
                },
                {
                    "description": "",
                    "发报行给收报行的附言": "null"
                },
                {
                    "description": "",
                    "给偿付行/承兑行/议付行的指示": "null"
                },
                {
                    "description": "",
                    "信用证唛头注明要求": "null"
                },
                {
                    "description": "",
                    "信用证包装要求": "null"
                },
                {
                    "description": "",
                    "信用证货物依据": "AS PER ORDER SHEET NO. JH191201"
                },
                {
                    "description": "",
                    "单据出具天数": "null"
                },
                {
                    "description": "",
                    "信用证简式条款": "null"
                },
                {
                    "description": "",
                    "信用证开证行名址": "BANCO COMMERCIAL PORTUGUES"
                },
                {
                    "description": "校验成功",
                    "信用证交单期限": "21"
                }
            ],
            "credit_letter": {
                "代办行SWIFT CODE": "BRCKBDHXXX",
                "代办行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "信用证交单期限": "21",
                "信用证产地证出具人要求": "CHAMBER OF COMMERCE",
                "信用证产地证格式": "CERTIFICATE OF ORIGIN FORM E IN 2 COPIES",
                "信用证保险不计免赔": "IRRESPECTIVE OF PERCENTAGE",
                "信用证保险偿付机构": "BANCO COMMERCIAL PORTUGUES",
                "信用证保险单承保险别": "CARGO",
                "信用证保险单金额要求": "USD 57,50",
                "信用证保险理赔地点": "BANGLADESH",
                "信用证兑付方式": "BY NEGOTIATION",
                "信用证分批装运": "ALLOWED",
                "信用证到期地点": "HONG KONG",
                "信用证到期日": "2024 Sep 16",
                "信用证包装要求": "null",
                "信用证单据份数要求": "1",
                "信用证单据名称": "COMMERCIAL INVOICE",
                "信用证卸货港/航空目的港": "CHATTOGRAM, BANGLADESH",
                "信用证原产地描述": "HONG KONG",
                "信用证发票金额拆分要求": "SHOWING FOB VALUE OF GOODS AND FREIGHT CHARGE SEPERATELY",
                "信用证受益人信息要求": "BENEFICIARY",
                "信用证受益人名称": "MR GLOBAL (HK) LIMITED",
                "信用证受益人地址": "FLAT/RM 1115-6 BLOCK 1, 117F, GRAND CENTURY PLACE 193 PRINCE SEE FIELD 47A",
                "信用证号码": "8524011689",
                "信用证合同号": "8524011689",
                "信用证唛头": "MR GLOBAL (HK) LIMITED",
                "信用证唛头注明要求": "null",
                "信用证商品编码": "5208390020",
                "信用证币种": "USD",
                "信用证开证日期": "2024 Jun 19",
                "信用证开证申请人名称": "TECHNO MEDICAL SYSTEM",
                "信用证开证申请人地址": "HOUSE NO-16(2ND FLOOR),ROAD NO-02, SHAYMOLI,SHER-E-BANGLA NAGAR,PS,DEHRA-1207, BANGLADESH.",
                "信用证开证行信息要求": "ISSUING BANK",
                "信用证开证行名址": "BANCO COMMERCIAL PORTUGUES",
                "信用证所有单据标注要求": "ALL DOCS MUST INDICATE LC NO. AND NAME OF LC ISSUING BANK.",
                "信用证手签要求": "MANUALLY SIGNED INVOICE IN TWO FOLDS",
                "信用证指示抬头要求": "TO ORDER OF APPLICANT",
                "信用证提单正本寄出要求": "1/3 ORIGINAL B/L TO BE SENT TO THE APPLICANT BY BENE DIRECTLY",
                "信用证收货地": "HONG KONG",
                "信用证数量下浮": "0.00%",
                "信用证数量浮动百分比": "3.00%",
                "信用证文件语言要求": "ENGLISH",
                "信用证最迟装运日期": "2024 Aug 26",
                "信用证汇票付款人": "BRAC BANK PLC",
                "信用证汇票付款人条款": "DRAWEE",
                "信用证汇票付款行SWIFT CODE": "BRCKBDHXXX",
                "信用证汇票付款行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "信用证汇票金额要求": "80% OF INVOICE VALUE",
                "信用证注明要求": "CERTIFYING THAT THE GOODS HEREIN INVOICED CONFORM TO PROFORMA INVOICE ISSUED BY THE BENEFICIARY",
                "信用证申请人信息要求": "TECHNO MEDICAL SYSTEM",
                "信用证目的地": "BANGLADESH",
                "信用证空白抬头要求": "CONSIGNEE",
                "信用证签署要求": "SIGNED COMMERCIAL INVOICE IN TWO FOLDS",
                "信用证简式条款": "null",
                "信用证背书要求": "BLANK ENDORSED",
                "信用证被保险人要求": "BANCO COMMERCIAL PORTUGUES",
                "信用证装货港口/始发航空港": "ANY SEA PORT OF CHINA/HONG KONG",
                "信用证货物产地要求": "CHINA",
                "信用证货物依据": "AS PER ORDER SHEET NO. JH191201",
                "信用证货物净重汇总": "22,000 KG",
                "信用证货物包装件数汇总": "1",
                "信用证货物尺寸汇总": "2835 m3",
                "信用证货物描述": "2163B-CTO-S01 CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM WITH STANDARD ACCESSORIES, 2163B-CTO-S01 CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM WITH STANDARD ACCESSORIES, 2167D-CTO-S01 DC-28 DIAGNOSTIC ULTRASOUND SYSTEM WITH STANDARD ACCESSORIES",
                "信用证货物描述_货物体积": "2835 m3",
                "信用证货物描述_货物净重": "22,000 KG",
                "信用证货物描述_货物单价": "USD 14.10/KG",
                "信用证货物描述_货物名称": "CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM",
                "信用证货物描述_货物型号": "2163B-CTO-S01, 2163B-CTO-S01, 2167D-CTO-S01",
                "信用证货物描述_货物尺寸": "1.02X50",
                "信用证货物描述_货物数量": "11,000 KG",
                "信用证货物描述_货物毛重": "22,000 KG",
                "信用证货物描述_货物等级": "Grade",
                "信用证货物描述_货物规格": "NVP 801 GLOSS",
                "信用证货物描述_货物金额": "USD 155,100",
                "信用证货物数量汇总": "22,000 KG",
                "信用证货物毛重汇总": "22,000 KG",
                "信用证货物金额汇总": "USD 298,100",
                "信用证贸易术语": "CIF BANGLADESH",
                "信用证贸易术语出处": "INCOTERMS 2020",
                "信用证转运": "ALLOWED",
                "信用证运费要求": "FREIGHT CHARGE",
                "信用证金额": "76424",
                "信用证金额上浮": "3.00%",
                "信用证金额下浮": "0.00%",
                "信用证金额要求": "MORE OR LESS",
                "偿付行SWIFT CODE": "BRCKBDHXXX",
                "偿付行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "偿付行账号": "76424",
                "偿付语句": "BY NEGOTIATION",
                "单据出具天数": "null",
                "单据要求": "ALL DOCS MUST INDICATE LC NO. AND NAME OF LC ISSUING BANK.",
                "发报行SWIFT CODE": "BRCKBDHXXX",
                "发报行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "发报行给收报行的附言": "null",
                "国家": "HK",
                "开证申请人银行SWIFT CODE": "BRCKBDHXXX",
                "开证申请人银行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "收报行SWIFT CODE": "BRCKBDHXXX",
                "收报行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "收费帐号": "null",
                "给偿付行/承兑行/议付行的指示": "null",
                "联系人": "null",
                "议付行SWIFT CODE": "BRCKBDHXXX",
                "议付行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "货物品种": "CONSONA N65 DIAGNOSTIC ULTRASOUND SYSTEM",
                "转通知行SWIFT CODE": "BRCKBDHXXX",
                "转通知行名称地址": "BANCO COMMERCIAL PORTUGUES",
                "附加条款": "BENEFICIARY DRAFTS AT SIGHT"
            },
            "error_msg": "",
            "proforma_invoice": {
                "PI受益人银行SWIFT CODE": "BKCHHKHHXXX",
                "PI受益人银行名称": "MR Global (HK) Limited",
                "PI受益人银行地址": "9/F,Bank of China Tower,1 GardenRoad,HongKong",
                "PI号码": "BBD-42422588/283191147",
                "PI币种": "USD",
                "PI目的港": "Any port in China or Hongkong",
                "PI账期": "L/C AT SIGHT",
                "PI货物描述": "2167B-CTO-S01 DC-28 Diagnostic Ultrasound System, Probe 6CV1P, Probe C6-2P, 2163B-CTO-S01 Consona N6S Diagnostic Ultrasound System, Transducer V10-4, Transducer C6-1, 2163B-CTO-S01 Consona N6S Diagnostic Ultrasound System, Transducer L13-3, Transducer C6-1, 2163B-CTO-S01 Consona N6S Diagnostic Ultrasound System, Transducer C6-1, Transducer P4-2",
                "PI贸易术语": "CFR Chattogram,Bangladesh",
                "PI金额": "76424",
                "开票主体名称": "MR Global (HK) Limited",
                "开票主体地址": "Flat/Rm 1115-6 Block 1, 11/F, Grand Century Place 193 Prince Edward West Road, Mongkok, KL, Hong Kong",
                "开票主体电话": "852 2511 0701",
                "账单收件人（Bill To）": "TECHNO MEDICAL SYSTEM"
            }
        };
    });

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});