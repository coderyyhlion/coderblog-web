import { type ReactNode } from 'react';
import { ClientOnly, Toaster } from '~/components';
import { cookies } from 'next/headers';
import { ResizableLayout } from '~/app/admin/_components/ResizableLayout';

export default function AdminLayout({ children }: { children: ReactNode }) {
	const layout = cookies().get('react-resizable-panels:layout');
	const collapsed = cookies().get('react-resizable-panels:collapsed');

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	return (
		<div>
			<ResizableLayout
				defaultLayout={defaultLayout}
				defaultCollapsed={defaultCollapsed}
				navCollapsedSize={4}
			>
				{children}
			</ResizableLayout>
			<ClientOnly>
				<Toaster />
			</ClientOnly>
		</div>
	);
}

function getRatio() {
	var ratio = 0;
	var screen = window.screen;
	console.log('screen', screen);
	var ua = navigator.userAgent.toLowerCase();

	if (window.devicePixelRatio !== undefined) {
		ratio = window.devicePixelRatio;
	} else if (~ua.indexOf('msie')) {
		// if (screen.deviceXDPI && screen.logicalXDPI) {
		// 	ratio = screen.deviceXDPI / screen.logicalXDPI;
		// }
	} else if (
		window.outerWidth !== undefined &&
		window.innerWidth !== undefined
	) {
		ratio = window.outerWidth / window.innerWidth;
	}

	if (ratio) {
		ratio = Math.round(ratio * 100);
	}
	return ratio;
}
