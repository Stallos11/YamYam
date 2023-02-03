// @ts-ignore
import Toast from 'axentix/dist/components/toast/toast.esm';

export const toast = (() => {
  const toastContent = `
    <div class='text-white d-flex fx-col w100'>
      <div class='d-flex vcenter p-2 pl-3 %headerClasses%'>
        <span class='font-w600'>%title%</span>
        <div data-toast-close class='ml-auto mr-1 cursor-pointer'>
          <span class='%crossClasses% font-s4'>x</span>
        </div>
      </div>
      <div class='d-flex fx-col p-3 %contentClasses%'>
        %content%
      </div>
    </div>`;

  const toast = new Toast('', {
    classes: 'bg-light p-0 rounded-1 shadow-2',
    duration: 5000,
    direction: 'bottom',
    offset: {
      y: '6%',
    },
  });

  const showToast = (
    title: string,
    content: string,
    headerClasses: string,
    contentClasses: string,
    crossClasses = 'text-black'
  ) => {
    toast.change(
      toastContent
        .replace('%title%', title)
        .replace('%content%', content)
        .replaceAll('%headerClasses%', headerClasses)
        .replaceAll('%contentClasses%', contentClasses)
        .replaceAll('%crossClasses%', crossClasses)
    );

    toast.show();
  };

  return {
    showToast,
  };
})();
