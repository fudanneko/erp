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
    const qpbreakingKnifegrindingPrice = document.getElementById('qpbreakingKnifegrindingPrice')
    const qpbreakingKnifegrindingPrice2 = document.getElementById('qpbreakingKnifegrindingPrice2')
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
    const qpholeMachiningPrice = document.getElementById('qpholeMachiningPrice')
    const qpholeMachiningPrice2 = document.getElementById('qpholeMachiningPrice2')
    const qpotherProcessingPrice = document.getElementById('qpotherProcessingPrice')
    const qpotherProcessingPrice2 = document.getElementById('qpotherProcessingPrice2')
    const qptotalCost = document.getElementById('qptotalCost')
    const qptotalCost2 = document.getElementById('qptotalCost2')
    const qpgrindingthickness = document.getElementById('qpgrindingthickness')
    const qpReferenceValue = document.getElementById('qpReferenceValue')
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
    const ppproductType = document.getElementById('productType')
    const pplength = document.getElementById('pplength')
    const ppwidth = document.getElementById('ppwidth')
    const ppthickness = document.getElementById('ppthickness')
    const ppproductMaterial = document.getElementById('productMaterial')
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
                        const quotationDate = dateformat(new Date(productQuotationData.quotationDate));
                        const materialUnitPrice = productQuotationData.materialUnitPrice;
                        const grindingPrice = productQuotationData.grindingPrice;
                        const breakingKnifegrindingPrice = productQuotationData.breakingKnifegrindingPrice;
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
                        const holeMachiningPrice = productQuotationData.holeMachiningPrice;
                        const otherProcessingPrice = productQuotationData.otherProcessingPrice;
                        const totalCost = productQuotationData.totalCost;
                        qpproductQuotationId.value = productQuotationId ?? '';
                        qpquotationDate.value = quotationDate ?? 0;
                        qpmaterialUnitPrice.value = materialUnitPrice ?? 0;
                        qpgrindingPrice.value = grindingPrice ?? 0;
                        qpbreakingKnifegrindingPrice.value = breakingKnifegrindingPrice ?? 0;
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
                        qpholeMachiningPrice.value = holeMachiningPrice ?? 0;
                        qpotherProcessingPrice.value = otherProcessingPrice ?? 0;
                        qptotalCost.value = totalCost ?? 0;
                        qpgrindingthickness.value = 1;

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
        const productMaterial = ppproductMaterial.value;
        const categoryId = orderDetailObject.categoryId;
        const categorytype = productTypemap.get(categoryId);
        // 1.料價格
        if (categorytype === "破碎刀" || categorytype === "墊圈" || categorytype === "零件(圓)" || categorytype === "齒輪" || categorytype === "軸心") {
            // 1-1.圓形算法
            // (半徑^2*24.8*厚度)/1000000 四捨五入到小數第二位
            const length = parseFloat(pplength.value) + 10;
            const thickness = parseFloat(ppthickness.value) + 5;
            const weight = (length / 2) * (length / 2) * 24.8 * thickness / 1000000;
            const weight4c = parseFloat(weight.toFixed(1));

            for (const row of meterail) {
                const steelMaterial = row.steelMaterial;
                const steelType = row.steelType;
                const steelMinSize = row.steelMinSize;
                const steelMaxSize = row.steelMaxSize;
                const steelUnitPrice = row.steelUnitPrice;
                if (productMaterial === steelMaterial && steelType === "圓型" && length > steelMinSize && length <= steelMaxSize) {
                    qpmaterialUnitPrice2.value = (weight4c * steelUnitPrice).toFixed(2).toString();
                    break;
                } else {
                    qpmaterialUnitPrice2.value = "查無資料";
                }
            }
        }
        if (categorytype === "粉碎刀" || categorytype === "清潔指板" || categorytype === "零件(方)") {
            // 1-2.方型算法
            const length = parseFloat(pplength.value) + 5;
            const width = parseFloat(ppwidth.value) + 5;
            const thickness = parseFloat(ppthickness.value) + 5;
            const weight = parseFloat((length * width * thickness * 8 / 1000000).toFixed(1));
            meterail.forEach(function (row) {
                const steelMaterial = row.steelMaterial;
                const steelType = row.steelType;
                const steelMinSize = row.steelMinSize;
                const steelMaxSize = row.steelMaxSize;
                let steelUnitPrice = row.steelUnitPrice;
                if (productMaterial === steelMaterial && steelType === "方型" && length > steelMinSize && length <= steelMaxSize) {
                    if (width <= 100 && length >= 300 && length < 1000) {
                        steelUnitPrice = steelUnitPrice + 3
                    }
                    if (width <= 100 && length >= 1000) {
                        steelUnitPrice = steelUnitPrice + 5
                    }
                    qpmaterialUnitPrice2.value = (weight * steelUnitPrice).toFixed(2).toString();
                } else {
                    qpmaterialUnitPrice2.value = "查無資料";
                }
            })
        }
        //
        // 2.研磨價格
        //    2-1 圓形算法
        const grindingthickness = qpgrindingthickness.value;

        if (categorytype === "墊圈" || categorytype === "零件(圓)" || categorytype === "") {
            const length = parseFloat(pplength.value) + 10;
            qpgrindingPrice2.value = (length * length * 2 / 645 * grindingthickness).toFixed(2).toString();
        }
        //    2-2 方形算法
        if (categorytype === "粉碎刀" || categorytype === "零件(方)" || categorytype === "") {
            const length = parseFloat(pplength.value) + 5;
            qpgrindingPrice2.value = (length / 25.4 * 12 * 1.3).toFixed(2).toString();
        }


        // 3.破碎刀研磨價格
        qpbreakingKnifegrindingPrice2.value = 0


        qpheatTreatmentPrice2.value = 0;
        qpwasherProcessingPrice2.value = 0;
        qpbreakingKnifeProcessingPrice2.value = 0;
        qpcrushingKnifeProcessingPrice2.value = 0;
        qptoothCount2.value = 0;
        qpwireCuttingPrice2.value = 0;
        qpotherProcessingPrice2.value = 0;
        qpholeMachiningPrice2.value = 0;
        qptotalCost2.value = 0;
        // 破碎刀悍補
        // 墊圈
        // 零件（圓）
        // 齒輪
        // 軸心
        // 粉碎刀
        // 零件（方）
        // 清潔指板
        // 線切割
    }


    function setautoReferenceValue() {
        qpgrindingthickness.addEventListener('change', function () {
            setReferenceValue();
        })
    }

    // ============================ 修改資料進去 edit()========================
    // 報價表修改

    function editproductQuotation() {
        const qpproductQuotationId = document.getElementById('qpproductQuotationId').value;
        const qporderDetailId = document.getElementById('qporderDetailId').value;
        const quotationDate = document.getElementById('qpquotationDate2').value;
        const qpmaterialUnitPrice = document.getElementById('qpmaterialUnitPrice').value;
        const qpgrindingPrice = document.getElementById('qpgrindingPrice').value;
        const qpbreakingKnifegrindingPricee = document.getElementById('qpbreakingKnifegrindingPrice').value;
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
        const qpholeMachiningPrice = document.getElementById('qpholeMachiningPrice').value;
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
                breakingKnifegrindingPrice: qpbreakingKnifegrindingPricee,
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
                holeMachiningPrice: qpholeMachiningPrice,
                otherProcessingPrice: qpotherProcessingPrice,
                totalCost: qptotalCost,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
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

// 訂單資訊修改
    function editOrderquotation() {
        const orderId = orderDetailObject.orderId;
        const qptotalCost = document.getElementById('qptotalCost').value;


        fetch('editOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: orderId,
                quotation: qptotalCost,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
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
            editOrderquotation();
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
                    if (orderState === 0) {
                        oporderState.value = '未完成';
                    } else {
                        oporderState.value = '已完成';
                    }

                    oporderId.value = OrderId;
                    opcustomerId.value = customerId;
                    opcustomerName.value = customerName;
                    oporderDate.value = orderDate;
                    opdeliveryDate.value = deliveryDate;
                    opquotation.value = quotation;
                    opnote.value = note;

                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================ 修改資料進去 editOrder()========================
    function editopOrder() {
        const oporderId = orderDetailObject.orderId;
        console.log('訂單編號', oporderId);
        const oporderDate = document.getElementById(`oporderDate`).value;
        const opdeliveryDate = document.getElementById(`opdeliveryDate`).value;
        const opnote = document.getElementById(`opnote`).value;

        fetch('editOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: oporderId,
                orderDate: oporderDate,
                deliveryDate: opdeliveryDate,
                note: opnote,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
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
    // ============================ 抓取所有修改的燈箱’修改‘按鈕 並綁定事件 ========================

    function setopeditbutton() {
        const editbuttons = document.getElementById('opconfirmbtn');
        editbuttons?.addEventListener('click', () => {
            editopOrder();
        })
    }


// ============================產品資料方法=============================

// ============================找熱處理=============================
    getHeatTreatmentPrice();
    let heatTreatmentPriceData = [];

    function getHeatTreatmentPrice() {
        fetch("getAllHeatTreatmentPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    heatTreatmentPriceData = data;
                    console.log("這是研磨資料", heatTreatmentPriceData);
                    dataaccount = heatTreatmentPriceData.length;
                    for (let i = 0; i < heatTreatmentPriceData.length; i++) {
                        let row = heatTreatmentPriceData[i];
                        const heatTreatmentId = row.heatTreatmentId;
                        const heatTreatmentMaterial = row.heatTreatmentMaterial;
                        const heatTreatmentUnitPrice = row.heatTreatmentUnitPrice;
                    }
                    getcategory();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

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
                    storage2input();
                    getmeterail();
                    getorderdata();
                    getproductQuotation();

                });

            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ===============================找材質===================================
    let meterail = [];
    let meterailmap = new Map();


    function getmeterail() {
        fetch("getAllSteelPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    meterail = data;
                    console.log("這是材質", data);
                    for (let i = 0; i < meterail.length; i++) {
                        let row = meterail[i];
                        const steelId = row.steelId;
                        const steelMaterial = row.steelMaterial;
                        const steelMinSize = row.steelMinSize;
                        const steelMaxSize = row.steelMaxSize;
                        const steelType = row.steelType;
                        const steelUnitPrice = row.steelUnitPrice;
                        meterailmap.set(steelId, steelUnitPrice);
                    }
                    ;
                    select4edit();
                    selected4edit();
                    setqpeditbutton();
                    setReferenceValue();
                    setautoReferenceValue();
                    setopeditbutton();
                    setppeditbutton();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    //自動選好修改內的select
    function selected4edit() {
        const categoryNameselect = $(`#categoryName`);
        const productNameselect = $(`#productName`);
        const productTypeselect = $(`#productType`);
        const productMaterialselect = $(`#productMaterial`);
        const httype = $(`#httype`);
        const productMaterial = orderDetailObject.productMaterial;
        const categoryId = orderDetailObject.categoryId;
        const categoryName = categoryNamemap.get(categoryId);
        const productName = productNamemap.get(categoryId);
        const productType = productTypemap.get(categoryId);
        categoryNameselect.val(categoryName).trigger('change.select2');
        productNameselect.val(productName).trigger('change.select2');
        productTypeselect.val(productType).trigger('change.select2');
        productMaterialselect.val(productMaterial).trigger('change.select2');
        httype.val(productMaterial).trigger('change.select2');
    }

    function select4edit() {
        //修改的select清空
        const productNamediv = $('#productNamediv')
        const productTypediv = $('#productTypediv')
        const categoryName = $('#categoryName');
        const productMaterial = $('#productMaterial');
        const productName = $('#productName');
        const productType = $('#productType');
        const httype = $('#httype');

        categoryName.empty();
        productMaterial.empty();
        httype.empty();

        //種類名稱select動態放入
        const htttype = new Set();
        htttype.add('請選擇');
        heatTreatmentPriceData.forEach(function (row) {
            const heatTreatmentMaterial = row.heatTreatmentMaterial;
            htttype.add(heatTreatmentMaterial);
        })
        htttype.forEach(function (row) {
            const option = new Option(row, row);
            httype.append(option);
        })

        httype.select2();

        //種類名稱select動態放入
        const uniqueCategoryNames = new Set();
        uniqueCategoryNames.add('請選擇');
        category.forEach(function (row) {
            const categoryName = row.categoryName;
            uniqueCategoryNames.add(categoryName);
        })
        uniqueCategoryNames.forEach(function (row) {
            const option = new Option(row, row);
            categoryName.append(option);
        })

        categoryName.select2();

        //產品名稱select動態放入
        const uniqueproductNames = new Set();
        uniqueproductNames.add('請選擇');
        category.forEach(function (row) {
            const productName = row.productName;
            uniqueproductNames.add(productName);
        })
        uniqueproductNames.forEach(function (row) {
            const option = new Option(row, row);
            productName.append(option);
        })
        productName.select2();

        //產品形式select動態放入
        const uniqueproductTypes = new Set();
        uniqueproductTypes.add('請選擇');
        category.forEach(function (row) {
            const productType = row.productType;
            uniqueproductTypes.add(productType);
        })
        uniqueproductTypes.forEach(function (row) {
            const option = new Option(row, row);
            productType.append(option);
        })
        productType.select2();

        //材質select動態放入
        const uniquesteelMaterial = new Set();
        console.log(meterail)
        meterail.forEach(function (row) {
            const steelMaterial = row.steelMaterial;
            uniquesteelMaterial.add(steelMaterial);
        })
        uniquesteelMaterial.forEach(function (row) {
            const option = new Option(row, row);
            productMaterial.append(option);
        })
        console.log(uniquesteelMaterial)
        productMaterial.select2();

        // 監聽種類名稱選擇事件
        categoryName.on('change', function () {
            productNamediv.css('display', '');
            productTypediv.css('display', 'none');
            const optiond = new Option('請選擇', '');
            productName.empty();
            productName.append(optiond);
            const selectedValue = categoryName.val();
            const uniquesteelMaterial = new Set();
            category.forEach(function (row) {
                const categoryName = row.categoryName;
                const productName = row.productName;
                if (categoryName === selectedValue) {
                    uniquesteelMaterial.add(productName);
                }
            })
            uniquesteelMaterial.forEach(function (row) {
                const option = new Option(row, row);
                productName.append(option);
            })
            productName.select2();
        });
        // 監聽產品名稱選擇事件
        productName.on('change', function () {
            productTypediv.css('display', '');
            productType.empty();
            const optiond = new Option('請選擇', '');
            productType.append(optiond);
            const selectedValue = productName.val();
            category.forEach(function (row) {
                const productName = row.productName;
                const productType1 = row.productType;
                if (productName === selectedValue) {
                    const option = new Option(productType1, productType1);
                    productType.append(option);
                }
            })
            productType.select2();
        });
    }


    // ===================產品明細資料填入==========================

    function storage2input() {

        const orderId = orderDetailObject.orderId;
        // const categoryId = orderDetailObject.categoryId;
        // const categorytype = productTypemap.get(categoryId);
        const length = orderDetailObject.length;
        const width = orderDetailObject.width;
        const thickness = orderDetailObject.thickness;
        // const productMaterial = orderDetailObject.productMaterial;
        const manufacturingProcess = orderDetailObject.manufacturingProcess;
        const productQuotationUnitPrice = orderDetailObject.productQuotationUnitPrice;
        const productQuantity = orderDetailObject.productQuantity;
        const productSubtotal = orderDetailObject.productSubtotal;
        const note = orderDetailObject.note;


        pporderDetailId.value = orderDetailId ?? 0;
        pporderId.value = orderId ?? 0;
        // ppcategoryId.value = categorytype ?? 0;
        pplength.value = length ?? 0;
        ppwidth.value = width ?? 0;
        ppthickness.value = thickness ?? 0;
        // ppproductMaterial.value = productMaterial ?? 0;
        ppmanufacturingProcess.value = manufacturingProcess ?? 0;
        ppproductQuotationUnitPrice.value = productQuotationUnitPrice ?? 0;
        ppproductQuantity.value = productQuantity ?? 0;
        ppproductSubtotal.value = productSubtotal ?? 0;
        ppnote.value = note ?? 0;

        const tital4product = document.getElementById('tital4product');
        tital4product.textContent = orderDetailObject.customerName + "  " + orderDetailObject.length + " ＊ " + orderDetailObject.width + " ＊ " + orderDetailObject.thickness;


    }

    // ============================ 修改資料進去 editOrder()========================
    function editppOrder() {
        const orderDetailId = pporderDetailId.value;
        const OrderId = pporderId.value;
        const productType = ppproductType.value;
        const categoryId = productTypemap2.get(productType);
        console.log(categoryId)
        const length = pplength.value;
        const width = ppwidth.value;
        const thickness = ppthickness.value;
        const productMaterial = ppproductMaterial.value;
        const manufacturingProcess = ppmanufacturingProcess.value;
        const productQuotationUnitPrice = ppproductQuotationUnitPrice.value;
        const productQuantity = ppproductQuantity.value;
        const productSubtotal = ppproductSubtotal.value;
        const note = ppnote.value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editOrderDetail', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderDetailId: orderDetailId,
                orderId: OrderId,
                categoryId: categoryId,
                length: length,
                width: width,
                thickness: thickness,
                productMaterial: productMaterial,
                manufacturingProcess: manufacturingProcess,
                productQuotationUnitPrice: productQuotationUnitPrice,
                productQuantity: productQuantity,
                productSubtotal: productSubtotal,
                note: note,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        sessionStorage.setItem('Orderdetail', JSON.stringify(body));
                        location.reload();
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

    function setppeditbutton() {
        const editbuttons = document.getElementById('ppconfirmbtn');
        editbuttons?.addEventListener('click', () => {
            editppOrder();
        })
    }


})();