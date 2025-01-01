const translationMap = {
  Fielland统计数据: "Statistics of Fielland",
  人: " ",
  人口: "Population",
  人口总数: "Total Population",
  人口密度: "Population Density",
  面积: "Area",
  区域信息: "Regional Info",
};

let currentLanguage = "zh"; // 当前语言状态，默认为中文

// 检测是否是中文字符
function containsChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}
//翻译文本

function translateHTML(text, targetLanguage) {
  if (containsChinese(text) && targetLanguage === "zh") return text;
  if (!containsChinese(text) && targetLanguage === "en") return text;
  const translationPattern = /[\u4e00-\u9fa5]+/g; // 匹配中文字符

  return text.replace(translationPattern, (match) => {
    const translatedText =
      translationMap[match] ||
      (targetLanguage === "zh"
        ? Object.keys(translationMap).find(
            (key) => translationMap[key] === match
          )
        : match);
    return translatedText || match;
  });
}

// 遍历所有文本节点并替换语言
function translatePage(targetLanguage) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = walker.nextNode())) {
    const originalText = node.nodeValue.trim();

    const translatedText =
      translationMap[originalText] ||
      (targetLanguage === "zh"
        ? Object.keys(translationMap).find(
            (key) => translationMap[key] === originalText
          )
        : originalText);

    if (translatedText) {
      node.nodeValue = translatedText;
    }
  }
  showRegionInfo(currentRegion);
  showStateInfo(currentRegion);
}

// 按钮点击事件，切换语言
document
  .getElementById("languageSwitch")
  .addEventListener("click", function () {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    translatePage(currentLanguage);
    this.textContent = currentLanguage === "zh" ? "English" : "中文";
  });
