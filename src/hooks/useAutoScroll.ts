import { useEffect, useRef, useState } from "react";

function useAutoScroll(domRef: any) {
	const [isAutoScroll, setIsAutoScroll] = useState(false);
	const timerRef = useRef<any>();
	const scrollRef = useRef<number>(0);

	useEffect(() => {
		if (isAutoScroll) {
			autoScrollToBottom();
			domRef.current?.addEventListener("scroll", handleScroll);
		}
		return () => {
			domRef.current?.removeEventListener("scroll", handleScroll);
			timerRef.current && clearInterval(timerRef.current);
		};
	}, [isAutoScroll]);

	const startScroll = () => {
		autoScrollToBottom();
		setIsAutoScroll(true);
	};
	const stopScroll = () => {
		setIsAutoScroll(false);
	};

	const handleScroll = () => {
		if (scrollRef.current > domRef.current.scrollTop) {
			//向上滚动关闭自动滚动
			timerRef.current && clearInterval(timerRef.current);
		} else if (
			domRef.current.scrollTop + domRef.current.offsetHeight >=
			domRef.current.scrollHeight - 100
		) {
			autoScrollToBottom();
		}
		scrollRef.current = domRef.current.scrollTop;
	};

	const autoScrollToBottom = () => {
		timerRef.current && clearInterval(timerRef.current);

		timerRef.current = setInterval(() => {
			domRef.current?.scrollTo({
				top: 999999,
				behavior: "smooth",
			});
		}, 400);
	};

	return [startScroll, stopScroll];
}

export default useAutoScroll;
