(() => {
    const tbody = document.querySelector('#tbody');
    // =========================報價分頁=========================
    const qpproductQuotationId = document.getElementById('qpproductQuotationId')
    const qporderDetailId = document.getElementById('qporderDetailId')
    const qpquotationDate = document.getElementById('qpquotationDate')
    const qpmaterialUnitPrice = document.getElementById('qpmaterialUnitPrice')
    const qpmaterialUnitPrice2 = document.getElementById('qpmaterialUnitPrice2')
    const qpgrindingPrice = document.getElementById('qpgrindingPrice')
    const qpgrindingPrice2 = document.getElementById('qpgrindingPrice2')
    const qpheatTreatmentPrice = document.getElementById('qpheatTreatmentPrice')
    const qpheatTreatmentPrice2 = document.getElementById('qpheatTreatmentPrice2')
    const qpwasherProcessingPrice = document.getElementById('qpwasherProcessingPrice')
    const qpwasherProcessingPrice2 = document.getElementById('qpwasherProcessingPrice2')
    const qpbreakingKnifeProcessingPrice = document.getElementById('qpbreakingKnifeProcessingPrice')
    const qpbreakingKnifeProcessingPrice2 = document.getElementById('qpbreakingKnifeProcessingPrice2')
    const qpcrushingKnifeProcessingPrice = document.getElementById('qpcrushingKnifeProcessingPrice')
    const qpcrushingKnifeProcessingPrice2 = document.getElementById('qpcrushingKnifeProcessingPrice2')
    const qptoothCount = document.getElementById('qptoothCount')
    const qptoothCount2 = document.getElementById('qptoothCount2')
    const qpwireCuttingPrice = document.getElementById('qpwireCuttingPrice')
    const qpwireCuttingPrice2 = document.getElementById('qpwireCuttingPrice2')
    const qphezhenQuotation = document.getElementById('qphezhenQuotation')
    const qpguofengQuotation = document.getElementById('qpguofengQuotation')
    const qpguoshengQuotation = document.getElementById('qpguoshengQuotation')
    const qphuataiQuotation = document.getElementById('qphuataiQuotation')
    const qpjinjiQuotation = document.getElementById('qpjinjiQuotation')
    const qpotherQuotation = document.getElementById('qpotherQuotation')
    const qpholeMultiplier = document.getElementById('qpholeMultiplier')
    const qpholeCount = document.getElementById('qpholeCount')
    const qpotherProcessingPrice = document.getElementById('qpotherProcessingPrice')
    const qpotherProcessingPrice2 = document.getElementById('qpotherProcessingPrice2')
    const qptotalCost = document.getElementById('qptotalCost')
    const qptotalCost2 = document.getElementById('qptotalCost2')
    // =========================訂單分頁=========================
    const oporderId = document.getElementById('oporderId')
    const opcustomerId = document.getElementById('opcustomerId')
    const opcustomerName = document.getElementById('opcustomerName')
    const oporderDate = document.getElementById('oporderDate')
    const opdeliveryDate = document.getElementById('opdeliveryDate')
    const opquotation = document.getElementById('opquotation')
    const opnote = document.getElementById('opnote')
    const oporderState = document.getElementById('oporderState')

    // =========================產品分頁=========================
    const pporderDetailId = document.getElementById('pporderDetailId')
    const pporderId = document.getElementById('pporderId')
    const ppcategoryId = document.getElementById('ppcategoryId')
    const pplength = document.getElementById('pplength')
    const ppwidth = document.getElementById('ppwidth')
    const ppthickness = document.getElementById('ppthickness')
    const ppproductMaterial = document.getElementById('ppproductMaterial')
    const ppmanufacturingProcess = document.getElementById('ppmanufacturingProcess')
    const ppproductQuotationUnitPrice = document.getElementById('ppproductQuotationUnitPrice')
    const ppproductQuantity = document.getElementById('ppproductQuantity')
    const ppproductSubtotal = document.getElementById('ppproductSubtotal')
    const ppnote = document.getElementById('ppnote')
    // =========================工作明細分頁=========================
    const wpworkDetailId = document.getElementById('wpworkDetailId')
    const wpworkRecordId = document.getElementById('wpworkRecordId')
    const wporderDetailId = document.getElementById('wporderDetailId')
    const wpproductionContentCode = document.getElementById('wpproductionContentCode')
    const wpproductionContentName = document.getElementById('wpproductionContentName')
    const wptimeSpentOnProduction = document.getElementById('wptimeSpentOnProduction')
    // =========================讀取sessionstorage=========================

    const Orderdetail = sessionStorage.getItem('Orderdetail');
    const orderDetailObject = JSON.parse(Orderdetail);
    const orderDetailId = orderDetailObject.orderDetailId;
    const orderId4search = orderDetailObject.orderId;


    // ============================報價方法 ========================


    // ============================查報價資料getAll ========================

    let productQuotationData = [];

    function getproductQuotation() {
        fetch('getProductQuotationByUk', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderDetailId: orderDetailId,
            }),
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('发生错误，状态码：' + response.status);
                    return;
                }
                qporderDetailId.value = orderDetailId ?? 0;
                return response.text(); // 使用.text()来获取响应体的文本内容
            })
            .then(function (data) {
                try {
                    const jsonData = JSON.parse(data);
                    // 在此處可以處理從 API 獲取的數據
                    if (jsonData) {
                        productQuotationData = jsonData;
                        console.log("這是報價資料", productQuotationData);
                        const productQuotationId = productQuotationData.productQuotationId;
                        const quotationDate = dateformat(new Date( productQuotationData.quotationDate));
                        const materialUnitPrice = productQuotationData.materialUnitPrice;
                        const grindingPrice = productQuotationData.grindingPrice;
                        const heatTreatmentPrice = productQuotationData.heatTreatmentPrice;
                        const washerProcessingPrice = productQuotationData.washerProcessingPrice;
                        const breakingKnifeProcessingPrice = productQuotationData.breakingKnifeProcessingPrice;
                        const crushingKnifeProcessingPrice = productQuotationData.crushingKnifeProcessingPrice;
                        const toothCount = productQuotationData.toothCount;
                        const wireCuttingPrice = productQuotationData.wireCuttingPrice;
                        const hezhenQuotation = productQuotationData.hezhenQuotation;
                        const guofengQuotation = productQuotationData.guofengQuotation;
                        const guoshengQuotation = productQuotationData.guoshengQuotation;
                        const huataiQuotation = productQuotationData.huataiQuotation;
                        const jinjiQuotation = productQuotationData.jinjiQuotation;
                        const otherQuotation = productQuotationData.otherQuotation;
                        const holeMultiplier = productQuotationData.holeMultiplier;
                        const holeCount = productQuotationData.holeCount;
                        const otherProcessingPrice = productQuotationData.otherProcessingPrice;
                        const totalCost = productQuotationData.totalCost;
                        qpproductQuotationId.value = productQuotationId ?? '';
                        qpquotationDate.value = quotationDate ?? 0;
                        qpmaterialUnitPrice.value = materialUnitPrice ?? 0;
                        qpgrindingPrice.value = grindingPrice ?? 0;
                        qpheatTreatmentPrice.value = heatTreatmentPrice ?? 0;
                        qpwasherProcessingPrice.value = washerProcessingPrice ?? 0;
                        qpbreakingKnifeProcessingPrice.value = breakingKnifeProcessingPrice ?? 0;
                        qpcrushingKnifeProcessingPrice.value = crushingKnifeProcessingPrice ?? 0;
                        qptoothCount.value = toothCount ?? 0;
                        qpwireCuttingPrice.value = wireCuttingPrice ?? 0;
                        qphezhenQuotation.value = hezhenQuotation ?? 0;
                        qpguofengQuotation.value = guofengQuotation ?? 0;
                        qpguoshengQuotation.value = guoshengQuotation ?? 0;
                        qphuataiQuotation.value = huataiQuotation ?? 0;
                        qpjinjiQuotation.value = jinjiQuotation ?? 0;
                        qpotherQuotation.value = otherQuotation ?? 0;
                        qpholeMultiplier.value = holeMultiplier ?? 0;
                        qpholeCount.value = holeCount ?? 0;
                        qpotherProcessingPrice.value = otherProcessingPrice ?? 0;

                        qptotalCost.value = totalCost ?? 0;

                    } else {
                        console.log('無報價資料');
                        // 在这里处理数据不存在的情况
                    }
                } catch (error) {
                    console.log('JSON解析出错:', error);
                    // 在这里处理JSON解析错误
                }
            })
    }

    // =======================參考值=====================================
    function setReferenceValue() {
        qpmaterialUnitPrice2.value = 0;
        qpgrindingPrice2.value = 0;
        qpheatTreatmentPrice2.value = 0;
        qpwasherProcessingPrice2.value = 0;
        qpbreakingKnifeProcessingPrice2.value = 0;
        qpcrushingKnifeProcessingPrice2.value = 0;
        qptoothCount2.value = 0;
        qpwireCuttingPrice2.value = 0;
        qpotherProcessingPrice2.value = 0;
        qptotalCost2.value = 0;
    }

    // ============================ 修改資料進去 edit()========================

    function editproductQuotation() {
        const qpproductQuotationId = document.getElementById('qpproductQuotationId').value;
        const qporderDetailId =  document.getElementById('qporderDetailId').value;
        const quotationDate = document.getElementById('qpquotationDate2').value;
        const qpmaterialUnitPrice = document.getElementById('qpmaterialUnitPrice').value;
        const qpgrindingPrice = document.getElementById('qpgrindingPrice').value;
        const qpheatTreatmentPrice = document.getElementById('qpheatTreatmentPrice').value;
        const qpwasherProcessingPrice = document.getElementById('qpwasherProcessingPrice').value;
        const qpbreakingKnifeProcessingPrice = document.getElementById('qpbreakingKnifeProcessingPrice').value;
        const qpcrushingKnifeProcessingPrice = document.getElementById('qpcrushingKnifeProcessingPrice').value;
        const qptoothCount = document.getElementById('qptoothCount').value;
        const qpwireCuttingPrice = document.getElementById('qpwireCuttingPrice').value;
        const qphezhenQuotation = document.getElementById('qphezhenQuotation').value;
        const qpguofengQuotation = document.getElementById('qpguofengQuotation').value;
        const qpguoshengQuotation = document.getElementById('qpguoshengQuotation').value;
        const qphuataiQuotation = document.getElementById('qphuataiQuotation').value;
        const qpjinjiQuotation = document.getElementById('qpjinjiQuotation').value;
        const qpotherQuotation = document.getElementById('qpotherQuotation').value;
        const qpholeMultiplier = document.getElementById('qpholeMultiplier').value;
        const qpholeCount = document.getElementById('qpholeCount').value;
        const qpotherProcessingPrice = document.getElementById('qpotherProcessingPrice').value;
        const qptotalCost = document.getElementById('qptotalCost').value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editProductQuotation', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                productQuotationId: qpproductQuotationId,
                orderDetailId: qporderDetailId,
                quotationDate: quotationDate,
                materialUnitPrice: qpmaterialUnitPrice,
                grindingPrice: qpgrindingPrice,
                heatTreatmentPrice: qpheatTreatmentPrice,
                washerProcessingPrice: qpwasherProcessingPrice,
                breakingKnifeProcessingPrice: qpbreakingKnifeProcessingPrice,
                crushingKnifeProcessingPrice: qpcrushingKnifeProcessingPrice,
                toothCount: qptoothCount,
                wireCuttingPrice: qpwireCuttingPrice,
                hezhenQuotation: qphezhenQuotation,
                guofengQuotation: qpguofengQuotation,
                guoshengQuotation: qpguoshengQuotation,
                huataiQuotation: qphuataiQuotation,
                jinjiQuotation: qpjinjiQuotation,
                otherQuotation: qpotherQuotation,
                holeMultiplier: qpholeMultiplier,
                holeCount: qpholeCount,
                otherProcessingPrice: qpotherProcessingPrice,
                totalCost: qptotalCost,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful,message} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: `${message}`, showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

//
    // ============================ 抓取’修改‘按鈕 並綁定事件 ========================


    function setqpeditbutton() {
        const editbuttons = document.getElementById('qpconfirmbtn');
        editbuttons?.addEventListener('click', () => {
            console.log('修改按鈕啟動')
            editproductQuotation();
        })
    }


    // ============================ 日期預設 ========================

    // 获取今天的日期
    const today = new Date();

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

// 获取日期的年、月和日
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
    const day = String(today.getDate()).padStart(2, '0');

    const year2 = nextWeek.getFullYear();
    const month2 = String(nextWeek.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
    const day2 = String(nextWeek.getDate()).padStart(2, '0');

// 格式化成 YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    const formattedDate2 = `${year2}-${month2}-${day2}`;

// 设置日期输入字段的值为今天/下週
    const orderDate4new = $('#qpquotationDate2');

    orderDate4new.val(formattedDate);

    // ===============================日期轉換 從查詢資料轉換成顯示資料====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================訂單方法=================================
    // ===============================查詢=================================


    let orderdata = [];

    function getorderdata() {
        fetch('getOrderbyorderId', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: orderId4search,
            }),
        })
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    orderdata = data;
                    console.log("這是訂單資料", orderdata);
                    const OrderId = orderdata.orderId;
                    const customerId = orderdata.customerId;
                    const customerName = orderdata.customerName;
                    const orderDate = dateformat(new Date(orderdata.orderDate));
                    const deliveryDate = dateformat(new Date(orderdata.deliveryDate));
                    const quotation = orderdata.quotation;
                    const note = orderdata.note;
                    const orderState = orderdata.orderState;

                    oporderId.value = OrderId;
                    opcustomerId.value = customerId;
                    opcustomerName.value = customerName;
                    oporderDate.value = orderDate;
                    opdeliveryDate.value = deliveryDate;
                    opquotation.value = quotation;
                    opnote.value = note;
                    oporderState.value = orderState;
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


// ============================產品資料方法=============================
// ============================找種類=============================
    let category = [];
    let categoryNamemap = new Map();
    let productNamemap = new Map();
    let productTypemap = new Map();
    let productTypemap2 = new Map();
    let productDefaultProcessmap = new Map();


    function getcategory() {
        fetch("getAllProductCategory")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    category = data;
                    console.log("這是種類", data);
                    for (let i = 0; i < category.length; i++) {
                        let row = category[i];
                        const categoryId = row.categoryId;
                        const categoryName = row.categoryName;
                        const productName = row.productName;
                        const productType = row.productType;
                        const productDefaultProcess = row.productDefaultProcess;
                        categoryNamemap.set(categoryId, categoryName);
                        productNamemap.set(categoryId, productName);
                        productTypemap.set(categoryId, productType);
                        productTypemap2.set(productType, categoryId);
                        productDefaultProcessmap.set(categoryId, productDefaultProcess);
                    }
                    ;
                });

            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ===================產品明細資料填入==========================

    storage2input();

    function storage2input() {

        const orderId = orderDetailObject.orderId;
        const categoryId = orderDetailObject.categoryId;
        const categorytype = productTypemap.get(categoryId);
        const length = orderDetailObject.length;
        const width = orderDetailObject.width;
        const thickness = orderDetailObject.thickness;
        const productMaterial = orderDetailObject.productMaterial;
        const manufacturingProcess = orderDetailObject.manufacturingProcess;
        const productQuotationUnitPrice = orderDetailObject.productQuotationUnitPrice;
        const productQuantity = orderDetailObject.productQuantity;
        const productSubtotal = orderDetailObject.productSubtotal;
        const note = orderDetailObject.note;


        pporderDetailId.value = orderDetailId ?? 0;
        pporderId.value = orderId ?? 0;
        ppcategoryId.value = categorytype ?? 0;
        pplength.value = length ?? 0;
        ppwidth.value = width ?? 0;
        ppthickness.value = thickness ?? 0;
        ppproductMaterial.value = productMaterial ?? 0;
        ppmanufacturingProcess.value = manufacturingProcess ?? 0;
        ppproductQuotationUnitPrice.value = productQuotationUnitPrice ?? 0;
        ppproductQuantity.value = productQuantity ?? 0;
        ppproductSubtotal.value = productSubtotal ?? 0;
        ppnote.value = note ?? 0;

        const tital4product = document.getElementById('tital4product');
        tital4product.textContent = orderDetailObject.customerName + "  " + orderDetailObject.length + " ＊ " + orderDetailObject.width + " ＊ " + orderDetailObject.thickness;

        getcategory();
        getorderdata();
        setqpeditbutton();
        getproductQuotation();
        setReferenceValue();
    }


    // 更改標頭


})();