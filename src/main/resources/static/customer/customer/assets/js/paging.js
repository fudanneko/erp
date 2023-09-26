(() => {
    const orderpagebutton=document.querySelector('#orderpagebutton');
    const prodctpagebutton=document.querySelector('#productpagebutton');
    // const customerpagebutton=document.querySelector('#customerpagebutton');
    const qoatationpagebutton=document.querySelector('#qoatationpagebutton');
    const workdetailpagebutton=document.querySelector('#workdetailpagebutton');
    const paging = document.querySelectorAll('.paging');

    orderpagebutton.addEventListener('click', function() {
        togglePage('orderpage');
    });
   prodctpagebutton.addEventListener('click', function() {
        togglePage('productpage');
    });
    // customerpagebutton.addEventListener('click', function() {
    //     togglePage('customerpage');
    // });
    qoatationpagebutton.addEventListener('click', function() {
        togglePage('qoatationpage');
    });
    workdetailpagebutton.addEventListener('click', function() {
        togglePage('workdetailpage');
    });
    function togglePage(pageId) {
        for (const page of paging) {
            if (page.id === pageId) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        }
    }
})();