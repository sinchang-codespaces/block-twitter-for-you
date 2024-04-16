const loadCustomPage = () => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', window.location.href, true);

  xhr.onerror = function () {
    document.documentElement.innerHTML = 'Error getting Page!';
  };

  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.documentElement.innerHTML = 'Removing the Subscription...';
      removeSubscription(this.responseText);
    } else if (this.readyState == 0) {
      document.documentElement.innerHTML = 'Initiating the Request...';
    } else if (this.readyState == 1) {
      document.documentElement.innerHTML = 'Establishing the Server...';
    } else if (this.readyState == 2) {
      document.documentElement.innerHTML = 'Request Recieved...';
    } else if (this.readyState == 3) {
      document.documentElement.innerHTML = 'Processing the Request...';
    } else {
      document.documentElement.innerHTML = 'Error Finding the Page!';
    }
  };
};

const removeSubscription = (htmlContentStr: string) => {
  const wrapper = document.createElement('DIV');
  wrapper.innerHTML = htmlContentStr;

  const paywalls = wrapper.querySelectorAll('.paywall');
  const subscriptions = wrapper.querySelectorAll('.subscription-benefits');

  paywalls.forEach((paywall) => {
    paywall.remove();
  });
  subscriptions.forEach((subscription) => {
    subscription.remove();
  });

  document.documentElement.innerHTML = 'Removing the Ads...';
  removeAds(wrapper.innerHTML);
};

const removeAds = (htmlContentStr: string) => {
  const wrapper = document.createElement('DIV');
  wrapper.innerHTML = htmlContentStr;

  const adverts = wrapper.querySelectorAll('.advert');
  adverts.forEach((advert) => {
    advert.remove();
  });

  putNewPage(wrapper);
};

const putNewPage = (pageHtml: HTMLElement) => {
  document.documentElement.innerHTML = pageHtml.innerHTML;
};
(() => {
  loadCustomPage();
})();
