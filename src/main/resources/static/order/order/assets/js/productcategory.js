(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================查資料回來getAll ========================
    let dataaccount = 0;
    getproductCategory();
    let ProductCategoryData = [];

    function getproductCategory() {
        fetch("getAllProductCategory")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    productCategoryData = data;
                    console.log("這是研磨資料", productCategoryData);
                    dataaccount = productCategoryData.length;
                    for (let i = 0; i < productCategoryData.length; i++) {
                        let row = productCategoryData[i];
                        const categoryId = row.categoryId;
                        const categoryName = row.categoryName;
                        const productName = row.productName;
                        const productType = row.productType;
                        const productDefaultProcess = row.productDefaultProcess;

                        dataTable.row.add([
                            categoryName,
                            productName,
                            productType,
                            productDefaultProcess,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">產品種類修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="categoryId${i}"
                                   class="col-form-label">編號:</label>
                            <input type="text" class="form-control" id="categoryId${i}" value="${categoryId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="categoryName${i}"
                                   class="col-form-label">機械類別:</label>
                            <input type="text" class="form-control" id="categoryName${i}" value="${categoryName}">
                        </div>
                       <div class="mb-3">
                            <label For="productName${i}"
                                   class="col-form-label">報價類別:</label>
                            <input type="text" class="form-control" id="productName${i}" value="${productName}">
                        </div>
                        <div class="mb-3">
                            <label For="productType${i}"
                                   class="col-form-label">產品名稱:</label>
                            <input type="text" class="form-control" id="productType${i}" value="${productType}">
                        </div>
                         <div class="mb-3">
                            <label For="productDefaultProcess${i}"
                                   class="col-form-label">預設流程:</label>
                            <input type="text" class="form-control" id="productDefaultProcess${i}" value="${productDefaultProcess}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span id="msg"> </span>
                    <button type="button" class="btn btn-secondary editbutton"
                            data-bs-dismiss="modal" id="cancle${i}">取消
                    </button>
                    <button type="button" class="btn btn-primary" id="confirm${i}">修改</button>
                </div>
            </div>
        </div>
    `,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    reloadscroll();
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
        paging: false,
        pageLength: 15,
        info: false,
        scroller: true
    });

    function reloadscroll() {
        window.addEventListener('load', function () {
            // 从本地存储中检索滚动位置
            let savedScrollPosition = localStorage.getItem('scrollPosition');
            // 将页面滚动到保存的位置
            window.scrollTo(0, savedScrollPosition);
        });
    };


    // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const categoryId = document.getElementById(`categoryId${i}`).value;
        const categoryName = document.getElementById(`categoryName${i}`).value;
        const productName = document.getElementById(`productName${i}`).value;
        const productType = document.getElementById(`productType${i}`).value;
        const productDefaultProcess = document.getElementById(`productDefaultProcess${i}`).value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editProductCategory', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                categoryId: categoryId,
                categoryName: categoryName,
                productName: productName,
                productType: productType,
                productDefaultProcess: productDefaultProcess,
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
    function newOrder() {
        const categoryName4new = document.querySelector('#categoryName4new').value;
        const productName4new = document.querySelector('#productName4new').value;
        const productType4new = document.querySelector('#productType4new').value;
        const productDefaultProcess4new = document.querySelector('#productDefaultProcess4new').value;


        fetch('newProductCategory', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                categoryName: categoryName4new,
                productName: productName4new,
                productType: productType4new,
                productDefaultProcess: productDefaultProcess4new,
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
        for (let i = 0; i < dataaccount; i++) {
            const categoryId = productCategoryData[i].categoryId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + categoryId)
                deledtbyPK(categoryId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(categoryId) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(categoryId)
        if (confirmed) {
            fetch('deleteProductCategory', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(categoryId),
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

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================詳情按鈕 資料寫入storage===================================

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    //=================================1. 總之先查一次=================================

    // ===============================2. 確認新增按鈕================================


//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();