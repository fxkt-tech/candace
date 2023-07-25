export function tagsAdd(tags: string[], aims: string[]): string[] {
  const uniqueTags: string[] = [];

  // 去除重复的字符串并保持顺序
  tags.forEach((tag) => {
    if (!uniqueTags.includes(tag)) {
      uniqueTags.push(tag);
    }
  });

  // 去除数组 aims 中已存在于 uniqueTags 的字符串并保持顺序
  aims.forEach((aim) => {
    if (!uniqueTags.includes(aim)) {
      uniqueTags.push(aim);
    }
  });

  return uniqueTags;
}

export function tagsDrop(tags: string[], aims: string[]): string[] {
  const uniqueTags: string[] = [];

  // 去除重复的字符串并保持顺序
  tags.forEach((tag) => {
    if (!uniqueTags.includes(tag)) {
      uniqueTags.push(tag);
    }
  });

  return uniqueTags.filter(function (tag) {
    return aims.indexOf(tag) === -1;
  });
}

export function tagSplit(str: string): string[] {
  var arr = str.split(",");
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    var strNoSpace = arr[i].trim();
    if (strNoSpace !== "") {
      result.push(strNoSpace);
    }
  }

  return result;
}
