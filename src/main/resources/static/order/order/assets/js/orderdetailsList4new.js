(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================
    // ===============================找種類===================================
    let category = [];
    let categoryNamemap = new Map();
    let productNamemap = new Map();
    let productTypemap = new Map();
    let productTypemap2 = new Map();
    let productDefaultProcessmap = new Map();
    getcategory();

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
                getmaterial();
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ===============================找材質===================================
    let meterail = [];
    let meterailmap = new Map();


    function getmaterial() {
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
                        const steelUnitPrice = row.steelUnitPrice;
                        meterailmap.set(steelId, steelUnitPrice);
                    }
                    ;
                });
                getorder();
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================找訂單========================
    let order = [];
    let ordercustomermap = new Map();


    function getorder() {
        fetch("getAllOrder")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    order = data;
                    console.log("這是訂單", data);
                    for (let i = 0; i < order.length; i++) {
                        let row = order[i];
                        const OrderId = row.orderId;
                        const customerId = row.customerId;
                        const customeruk = row.customeruk;
                        const customerName = row.customerName;
                        const orderDate = dateformat(new Date(row.orderDate));
                        const deliveryDate = dateformat(new Date(row.deliveryDate));
                        const quotation = row.quotation;
                        const note = row.note;
                        const orderState = row.orderState;
                        ordercustomermap.set(customeruk, customerName);
                    }
                    ;
                });
                getOrderDetailByOrder();
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================查資料回來getAllPromotion() 拿到字串和筆數========================
    let dataaccount = 0;

    let Orderdetail = []


    function getOrderDetailByOrder() {
        const orderData = JSON.parse(sessionStorage.getItem('order'));
        const orderId = orderData.orderId;
        fetch('getOrderDetailByOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: (orderId),
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
                    Orderdetail = data;
                    console.log('查到的訂單：', Orderdetail);
                    dataaccount = Orderdetail.length;
                    for (let i = 0; i < Orderdetail.length; i++) {
                        let row = Orderdetail[i];
                        const orderDetailId = row.orderDetailId;
                        const orderId = row.orderId;
                        const customerName = row.customerName;
                        const categoryId = row.categoryId;
                        const categorytype = productTypemap.get(categoryId);
                        const length = row.length;
                        const width = row.width;
                        const thickness = row.thickness;
                        const productMaterial = row.productMaterial;
                        const manufacturingProcess = row.manufacturingProcess;
                        const productQuotationUnitPrice = row.productQuotationUnitPrice;
                        const productQuantity = row.productQuantity;
                        const productSubtotal = row.productSubtotal;
                        const note = row.note;

                        dataTable.row.add([orderId,
                            customerName,
                            categorytype,
                            length,
                            width,
                            thickness,
                            productMaterial,
                            productQuotationUnitPrice,
                            productQuantity,
                            productSubtotal,
                            note,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="-1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">訂單明細修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="mb-3">
                            <label For="orderDetailId${i}"
                                   class="col-form-label">訂單明細編號:</label>
                            <input type="text" class="form-control" id="orderDetailId${i}" value="${orderDetailId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="orderId${i}"
                                   class="col-form-label">訂單編號:</label>
                            <input type="text" class="form-control" id="OrderId${i}" value="${orderId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="categoryName${i}"
                                   class="col-form-label">種類名稱:</label>
                            <select name="" id="categoryName${i}" class="select24datatable" style="width: 200px"></select>
                        </div>
                        <div class="mb-3" id="productNamediv${i}">
                            <label For="productName${i}"
                                   class="col-form-label">產品名稱:</label>
                            <select name="" id="productName${i}" class="select24datatable" style="width: 200px;  display: inline-block ; margin-right: 10px; padding: 5px;  "></select>
                        </div>
                        <div class="mb-3" id="productTypediv${i}">
                            <label For="productType${i}"
                                   class="col-form-label">產品形式:</label>
                            <select name="" id="productType${i}" class="select24datatable" style="width: 200px;  display: inline-block ; margin-right: 110px; padding: 5px; "></select>
                        </div>
                        
                        <div class="mb-3">
                            <label For="length${i}"
                                   class="col-form-label">:長度/外徑</label>
                            <input type="text" class="form-control" id="length${i}" value="${length}">
                        </div>
                        <div class="mb-3">
                            <label For="width${i}"
                                   class="col-form-label">寬度/內徑:</label>
                           <input type="text" class="form-control" id="width${i}" value="${width}">
                        </div>
                         <div class="mb-3">
                            <label For="thickness${i}"
                                   class="col-form-label">厚度:</label>
                            <input type="text" class="form-control" id="thickness${i}" value="${thickness}">
                        </div>
                        <div class="mb-3">
                            <label For="productMaterial${i}"
                                   class="col-form-label">材質:</label>
                            <select name="" id="productMaterial${i}" class="select24datatable" style="width: 200px;  "></select>
                        </div>
                        <div class="mb-3">
                            <label For="manufacturingProcess${i}"
                                   class="col-form-label">製作流程:</label>
                            <textarea type="text" class="form-control" id="manufacturingProcess${i}" >${manufacturingProcess}</textarea>
                        </div>
                         <div class="mb-3">
                            <label For="productQuotationUnitPrice${i}"
                                   class="col-form-label">單價:</label>
                            <input type="text" class="form-control" id="productQuotationUnitPrice${i}" value="${productQuotationUnitPrice}">
                        </div>
                        <div class="mb-3">
                            <label For="productQuantity${i}"
                                   class="col-form-label">數量:</label>
                            <input type="text" class="form-control" id="productQuantity${i}" value="${productQuantity}">
                        </div>
                        <div class="mb-3">
                            <label For="productSubtotal${i}"
                                   class="col-form-label">小計:</label>
                            <input type="text" class="form-control" id="productSubtotal${i}" value="${productSubtotal}">
                        </div>
                         <div class="mb-3">
                            <label For="note${i}"
                                   class="col-form-label">備註:</label>
                           <textarea  class="form-control" id="note${i}" >${note}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span id="msg"> </span>
                    <button type="button" class="btn btn-secondary editbutton"
                            data-bs-dismiss="modal" id="cancle${i}">取消
                    </button>
                    <button type="button" class="btn btn-primary" id="confirm${i}">確定</button>
                </div>
            </div>
        </div>
    </div>`,
                            `<button type="button" class="btn btn-outline-primary" id="detail${i}">詳情</button>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    orderIdinnew()
                    seteditbutton();
                    setdeletebutton();
                    select4new();
                    select4edit();
                    selected4edit();
                    reloadscroll();
                    detailbutton();

                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        // scrollY: '600px',
        scrollCollapse: false,
        paging: true,
        pageLength: 15,
        info: false,
        destroy: true,
        columnDefs: [
            // {
            //     targets: 0, // 第一列
            //     width: '20px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 1, // 第一列
            //     width: '20px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 2, // 第一列
            //     width: '100px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 5, // 第一列
            //     width: '75px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 6, // 第5列
            //     width: '250px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 7, // 第6列
            //     width: '50px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 8, // 第7列
            //     width: '50px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 9, // 第8列
            //     width: '50px' // 设置宽度，可以根据需要调整
            // },
        ],
        dom: 'Qlfrtip',
    });

    function reloadscroll() {
        window.addEventListener('load', function () {
            // 从本地存储中检索滚动位置
            let savedScrollPosition = localStorage.getItem('scrollPosition');
            // 将页面滚动到保存的位置
            window.scrollTo(0, savedScrollPosition);
        });
    };
//

//     // ============================ 客戶代號及客戶名稱切換 ========================
    const categoryId4new = $('#categoryId4new');
    const categoryName4new = $('#categoryName4new');
    const productName4new = $('#productName4new');
    const productType4new = $('#productType4new');
    const productMaterial4new = $('#productMaterial4new');
    const productName4newdiv = $('#productName4newdiv');
    const productType4newdiv = $('#productType4newdiv');


    function select4new() {
        //新增的select清空
        categoryId4new.empty();
        productMaterial4new.empty();
        //種類select動態放入
        const uniqueCategoryNames = new Set();
        category.forEach(function (row) {
            const categoryName = row.categoryName;
            uniqueCategoryNames.add(categoryName);
        })
        uniqueCategoryNames.forEach(function (row) {
            const option = new Option(row, row);
            categoryName4new.append(option);
        })
        // categoryName4new.select2();
        //


        //材質select動態放入
        const uniquesteelMaterial = new Set();
        meterail.forEach(function (row) {
            const steelMaterial = row.steelMaterial;
            uniquesteelMaterial.add(steelMaterial);
        })
        uniquesteelMaterial.forEach(function (row) {
            const option = new Option(row, row);
            productMaterial4new.append(option);
        })
        // productMaterial4new.select2();

        // 監聽種類名稱選擇事件
        categoryName4new.on('change', function () {
            productName4newdiv.css('display', 'block');
            productType4newdiv.css('display', 'none');
            const optiond = new Option('請選擇', '');
            productName4new.empty();
            productName4new.append(optiond);
            const selectedValue = categoryName4new.val();
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
                productName4new.append(option);
            })

            // productName4new.select2();
        });
        // 監聽產品名稱選擇事件
        productName4new.on('change', function () {
            productType4newdiv.css('display', 'block');
            productType4new.empty();
            const optiond = new Option('請選擇', '');
            productType4new.append(optiond);
            const selectedValue = productName4new.val();
            const selectedCategoryValue = categoryName4new.val();
            category.forEach(function (row) {
                const productName = row.productName;
                const productType1 = row.productType;
                const categoryName = row.categoryName;
                if (categoryName === selectedCategoryValue && productName === selectedValue) {
                    const option = new Option(productType1, productType1);
                    productType4new.append(option);
                }
            })
            // productType4new.select2();
        });
    }


    //自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < Orderdetail.length; i++) {
            const categoryNameselect = $(`#categoryName${i}`);
            const productNameselect = $(`#productName${i}`);
            const productTypeselect = $(`#productType${i}`);
            const productMaterialselect = $(`#productMaterial${i}`);
            const categoryName = categoryNamemap.get(Orderdetail[i].categoryId);
            const productName = productNamemap.get(Orderdetail[i].categoryId);
            const productType = productTypemap.get(Orderdetail[i].categoryId);
            const productMaterial = Orderdetail[i].productMaterial;
            categoryNameselect.val(categoryName).trigger('change.select2');
            productNameselect.val(productName).trigger('change.select2');
            productTypeselect.val(productType).trigger('change.select2');
            productMaterialselect.val(productMaterial).trigger('change.select2');
        }
    }

    function select4edit() {
        //修改的select清空
        for (let i = 0; i < category.length; i++) {
            const productNamediv = $('#productNamediv' + i)
            const productTypediv = $('#productTypediv' + i)
            const categoryName = $('#categoryName' + i);
            const productMaterial = $('#productMaterial' + i);
            const productName = $('#productName' + i);
            const productType = $('#productType' + i);
            categoryName.empty();
            productMaterial.empty();

            //種類名稱elect動態放入
            const uniqueCategoryNames = new Set();
            category.forEach(function (row) {
                const categoryName = row.categoryName;
                uniqueCategoryNames.add(categoryName);
            })
            uniqueCategoryNames.forEach(function (row) {
                const option = new Option(row, row);
                categoryName.append(option);
            })
            // categoryName.select2();

            //產品名稱select動態放入
            const uniqueproductNames = new Set();
            category.forEach(function (row) {
                const productName = row.productName;
                uniqueproductNames.add(productName);
            })
            uniqueproductNames.forEach(function (row) {
                const option = new Option(row, row);
                productName.append(option);
            })
            // productName.select2();

            //產品形式select動態放入
            const uniqueproductTypes = new Set();
            category.forEach(function (row) {
                const productType = row.productType;
                uniqueproductTypes.add(productType);
            })
            uniqueproductTypes.forEach(function (row) {
                const option = new Option(row, row);
                productType.append(option);
            })
            // productType.select2();

            //材質select動態放入
            const uniquesteelMaterial = new Set();
            meterail.forEach(function (row) {
                const steelMaterial = row.steelMaterial;
                uniquesteelMaterial.add(steelMaterial);
            })
            uniquesteelMaterial.forEach(function (row) {
                const option = new Option(row, row);
                productMaterial.append(option);
            })
            // productMaterial.select2();

            // 監聽種類名稱選擇事件
            categoryName.on('change', function () {
                productNamediv.css('display', 'block');
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
                // productName.select2();
            });
            // 監聽產品名稱選擇事件
            productName.on('change', function () {
                productTypediv.css('display', 'block');
                productType.empty();
                const optiond = new Option('請選擇', '');
                productType.append(optiond);
                const selectedValue = productName.val();
                const selectedCategoryValue = categoryName.val();
                category.forEach(function (row) {
                    const productName = row.productName;
                    const productType1 = row.productType;
                    const categoryName = row.categoryName;
                    if (categoryName === selectedCategoryValue && productName === selectedValue) {
                        const option = new Option(productType1, productType1);
                        productType.append(option);
                    }
                })
                // productType.select2();
            });
        }
    }


//     // ============================ 新增燈箱的日期預設 ========================

//     // 获取今天的日期
//     const today = new Date();
//
//     const nextWeek = new Date(today);
//     nextWeek.setDate(today.getDate() + 7);
//
// // 获取日期的年、月和日
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
//     const day = String(today.getDate()).padStart(2, '0');
//
//     const year2 = nextWeek.getFullYear();
//     const month2 = String(nextWeek.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
//     const day2 = String(nextWeek.getDate()).padStart(2, '0');
//
// // 格式化成 YYYY-MM-DD
//     const formattedDate = `${year}-${month}-${day}`;
//     const formattedDate2 = `${year2}-${month2}-${day2}`;
//
// // 设置日期输入字段的值为今天/下週
//     const orderDate4new = $('#orderDate4new');
//     const deliveryDate4new = $('#deliveryDate4new');
//
//     orderDate4new.val(formattedDate);
//     deliveryDate4new.val(formattedDate2);
//

//     // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const orderDetailId = document.getElementById(`orderDetailId${i}`).value;
        const OrderId = document.getElementById(`OrderId${i}`).value;
        const productType = document.getElementById(`productType${i}`).value;
        console.log(productType);
        const categoryId = productTypemap2.get(productType);
        console.log(categoryId)
        const length = document.getElementById(`length${i}`).value;
        const width = document.getElementById(`width${i}`).value;
        const thickness = document.getElementById(`thickness${i}`).value;
        const productMaterial = document.getElementById(`productMaterial${i}`).value;
        const manufacturingProcess = document.getElementById(`manufacturingProcess${i}`).value;
        const productQuotationUnitPrice = document.getElementById(`productQuotationUnitPrice${i}`).value;
        const productQuantity = document.getElementById(`productQuantity${i}`).value;
        const productSubtotal = document.getElementById(`productSubtotal${i}`).value;
        const note = document.getElementById(`note${i}`).value;

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
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                        localStorage.setItem('scrollPosition', scrollPosition);
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

    function seteditbutton() {
        for (let i = 0; i < dataaccount; i++) {
            const editbuttons = document.getElementById('confirm' + i);
            editbuttons?.addEventListener('click', () => {
                console.log('修改按鈕啟動' + i)
                editOrder(i);
            })
        }
    }

//     // ============================   newOrder()新增訂單========================
    const orderData = JSON.parse(sessionStorage.getItem('order'));
    const orderId = orderData.orderId;
    const customerId = orderData.customerId;
    const customerName = orderData.customerName;

    function orderIdinnew() {

        const OrderIdinput = document.getElementById(`orderId4new`);
        OrderIdinput.value = orderId;
        const titlea = document.querySelector('#titlea');
        titlea.textContent = '訂單明細列表 訂單編號： ' + orderId;

    }

    function newOrder() {
        const orderId = document.getElementById(`orderId4new`).value;
        const productType = document.getElementById(`productType4new`).value;
        const categoryId = productTypemap2.get(productType);
        const length = document.getElementById(`length4new`).value;
        const width = document.getElementById(`width4new`).value;
        const thickness = document.getElementById(`thickness4new`).value;
        const productMaterial = document.getElementById(`productMaterial4new`).value;
        const manufacturingProcess = document.getElementById(`manufacturingProcess4new`).value;
        const productQuotationUnitPrice = document.getElementById(`productQuotationUnitPrice4new`).value;
        const productQuantity = document.getElementById(`productQuantity4new`).value;
        const productSubtotal = document.getElementById(`productSubtotal4new`).value;
        const note = document.getElementById(`note4new`).value;

        // if (customerId4new === '') {
        //     msg4new.textContent = '客戶代號不可為空';
        //     return;
        // }


        fetch('newOrderDetail', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: orderId,
                customerName: customerName,
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
                const {successful, message} = body;
                if (successful) {

                    Swal.fire({
                        position: 'center', icon: 'success', title: '新增成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                        localStorage.setItem('scrollPosition', scrollPosition);
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: `${message}`, footer: '<a href=""></a>'
                    })
                }
                ;

            });

    };

    const newbutton = document.querySelector('#newbutton');
    newbutton.addEventListener('click', () => {
        newOrder();
    })
//

//
    // ============================7. 找到所有刪除按鈕並加上事件========================

    function setdeletebutton() {

        if (dataaccount !== 0) {
            for (let i = 0; i < dataaccount; i++) {
                let row = Orderdetail[i];
                const orderDetailId = row.orderDetailId;
                const deletebutton = document.getElementById('delete' + i);
                deletebutton?.addEventListener('click', () => {
                    console.log('第' + i + '個的ｉｄ:' + orderDetailId)
                    deledtbyPK(orderDetailId);
                })
            }
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(orderId) {
        const confirmed = confirm("確定要刪除嗎？");
        if (confirmed) {
            fetch('deleteOrderDetail', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(orderId),
            })
                .then((resp) => {
                    if (resp) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '刪除成功!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                            localStorage.setItem('scrollPosition', scrollPosition);
                            location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error', title: 'Oops...', text: '刪除失敗!', footer: '<a href=""></a>'
                        })
                    }
                })
        }
    };

//

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    //=================================1.詳情=================================
    function detailbutton() {
        for (let i = 0; i < dataaccount; i++) {
            const detailbutton = document.getElementById('detail' + i);
            detailbutton?.addEventListener('click', () => {
                sessionStorage.setItem('Orderdetail', JSON.stringify(Orderdetail[i]));
                window.open('orderdetails.html', '_blank');
            })
        }
    }

    // ===============================2. 確認新增按鈕================================

    // const button4new = document.querySelector('#newbutton');
    // button4new?.addEventListener('click', () => {
    //     newAPromotion();
    // })
//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();