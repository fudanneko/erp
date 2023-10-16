(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================查資料回來getAll ========================
    let dataaccount = 0;
    getgrindingPrice();
    let grindingPriceData = [];

    function getgrindingPrice() {
        fetch("getAllGrindingPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    grindingPriceData = data;
                    console.log("這是研磨資料", grindingPriceData);
                    dataaccount=grindingPriceData.length;
                    for (let i = 0; i < grindingPriceData.length; i++) {
                        let row = grindingPriceData[i];
                        const grindingId = row.grindingId;
                        const grindingVendor = row.grindingVendor;
                        const grindingType = row.grindingType;
                        const grindingMinSize = row.grindingMinSize;
                        const grindingMaxSize = row.grindingMaxSize;
                        const grindingUnitPrice = row.grindingUnitPrice;

                        dataTable.row.add([grindingId,
                            grindingVendor,
                            grindingType,
                            grindingMinSize,
                            grindingMaxSize,
                            grindingUnitPrice,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">研磨明細修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="grindingId${i}"
                                   class="col-form-label">編號:</label>
                            <input type="text" class="form-control" id="grindingId${i}" value="${grindingId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="grindingVendor${i}"
                                   class="col-form-label">廠商名稱:</label>
                            <select name="" id="grindingVendor${i}" class="select24datatable" style="width: 300px"> 
                           <option>鎮金泰</option>
                           <option>二廠</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label For="grindingType${i}"
                                   class="col-form-label">種類:</label>
                            <select name="" id="grindingType${i}" class="select24datatable" style="width: 300px" >
                             <option>平面</option>
                              <option>悍補</option>
                             </select>
                        </div>
                        <div class="mb-3">
                            <label For="grindingMinSize${i}"
                                   class="col-form-label">最低尺寸:</label>
                            <input type="date" class="form-control" id="grindingMinSize${i}" value="${grindingMinSize}">
                        </div>
                        <div class="mb-3">
                            <label For="grindingMaxSize${i}"
                                   class="col-form-label">最高尺寸:</label>
                           <input type="date" class="form-control" id="grindingMaxSize${i}" value="${grindingMaxSize}">
                        </div>
                         <div class="mb-3">
                            <label For="grindingUnitPrice${i}"
                                   class="col-form-label">單價:</label>
                            <input type="text" class="form-control" id="grindingUnitPrice${i}" value="${grindingUnitPrice}">
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
    </div>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    selected4edit();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        scrollY: '600px',
        scrollCollapse: true,
        paging: true,
        pageLength: 15,
        info: false,
        destroy: true,
    });

    //自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < dataaccount; i++) {
            const grindingVendorselect = $(`#grindingVendor${i}`);
            const grindingTypeselect = $(`#grindingType${i}`);
            const grindingVendor =grindingPriceData[i].grindingVendor;
            const grindingType =grindingPriceData[i].grindingType;
            grindingVendorselect.val(grindingVendor).trigger('change.select2');
            grindingTypeselect.val(grindingType).trigger('change.select2');
        }
    }
  // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const grindingId = document.getElementById(`grindingId${i}`).value;
        const grindingVendor = document.getElementById(`grindingVendor${i}`).value;
        const grindingType = document.getElementById(`grindingType${i}`).value;
        const grindingMinSize = document.getElementById(`grindingMinSize${i}`).value;
        const grindingMaxSize = document.getElementById(`grindingMaxSize${i}`).value;
        const grindingUnitPrice = document.getElementById(`grindingUnitPrice${i}`).value;

        console.log("OrderId : " + grindingId)
        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editGrindingPrice', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                grindingId: grindingId,
                grindingVendor: grindingVendor,
                grindingType: grindingType,
                grindingMinSize: grindingMinSize,
                grindingMaxSize: grindingMaxSize,
                grindingUnitPrice: grindingUnitPrice,
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
        const grindingVendor4new = document.querySelector('#grindingVendor4new').value;
        const grindingType4new = document.querySelector('#grindingType4new').value;
        const grindingMinSize4new = document.querySelector('#grindingMinSize4new').value;
        const grindingMaxSize4new = document.querySelector('#grindingMaxSize4new').value;
        const grindingUnitPrice4new = document.querySelector('#grindingUnitPrice4new').value;
        if (grindingVendor4new === '') {
            return;
        }
        if (grindingType4new === '') {
            return;
        }
        if (grindingMinSize4new === '') {
            return;
        }
        if (grindingMaxSize4new === '') {
            return;
        }
        if (grindingUnitPrice4new === '') {
            return;
        }

        fetch('newGrindingPrice', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                grindingVendor: grindingVendor4new,
                grindingType: grindingType4new,
                grindingMinSize: grindingMinSize4new,
                grindingMaxSize: grindingMaxSize4new,
                grindingUnitPrice: grindingUnitPrice4new,
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
            const grindingId = grindingPriceData[i].grindingId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + grindingId)
                deledtbyPK(grindingId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(grindingId) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(grindingId)
        if (confirmed) {
            fetch('deleteGrindingPrice', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(grindingId),
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