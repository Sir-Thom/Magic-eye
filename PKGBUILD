# This is an example PKGBUILD file. Use this as a start to creating your own,
# and remove these comments. For more information, see 'man PKGBUILD'.
# NOTE: Please fill out the license field for your package! If it is unknown,
# then please put 'unknown'.

# Maintainer: Your Name <youremail@domain.com>
pkgname=Magic-Eye-git
pkgver=0.60
pkgrel=1
epoch=
pkgdesc="A simple GUI interface for setting a live view from a camera "
arch=(x86_64)
url="https://github.com/Thomas-Toulouse/Magic-Eye.git"
license=('GPL-3.0')
groups=()
depends=(git python3 gtk3 gst-libav gst-plugins-bad gst-plugins-good gst-plugins-ugly gst-rtsp-server )
makedepends=()
checkdepends=()
optdepends=()
provides=(Magic Eye)
conflicts=(Magic Eye)
replaces=(Magic Eye)
backup=()
options=()
install=
changelog=
source=("git+$url")
noextract=()
md5sums=('SKIP')
validpgpkeys=()


build() {
	#cd $srcdir/$pkgname-$pkgver
	cd Magic-Eye
	#./configure --prefix=/usr
	make X11INC=/usr/include/X11 X11LIB=/usr/lib/X11
}



package() {
	cd Magic-Eye
	mkdir -p ${pkgdir}/opt/${pkgname}
	cp * -rf ${pkgdir}/opt/${pkgname}
	make PREFIX=/usr DESTDIR="${pkgdir}" install
	install -Dm644 LICENSE "${pkgdir}/usr/share/license/${pkgname}/LICENSE"
	install -Dm644 README.md "${pkgdir}/usr/share/doc/${pkgname}/README.md"
}
