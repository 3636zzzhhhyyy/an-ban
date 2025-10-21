// 页面特定粒子配置
const pageConfigs = {
    'index': {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#00ffff", "#ff00ff", "#ffff00"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    },
    'product': {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 600 } },
            color: { value: ["#3a86ff", "#8338ec", "#ff006e"] },
            shape: { type: "triangle" },
            opacity: { value: 0.4, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 3, direction: "top", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "bubble" }
            }
        }
    },
    'solution': {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 1000 } },
            color: { value: ["#4ECDC4", "#FF6B6B", "#FFE66D"] },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 100, color: "#ffffff", opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "grab" }
            }
        }
    },
    'team': {
        particles: {
            number: { value: 70, density: { enable: true, value_area: 700 } },
            color: { value: ["#00ff00", "#ff0000", "#0000ff"] },
            shape: { type: "star" },
            opacity: { value: 0.6, random: true },
            size: { value: 3.5, random: true },
            line_linked: { enable: true, distance: 200, color: "#ffffff", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2.5, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" }
            }
        }
    },
    'contact': {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 500 } },
            color: { value: ["#ffffff", "#00ffff", "#ff00ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 2.5, random: true },
            line_linked: { enable: true, distance: 120, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "connect" }
            }
        }
    }
};

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面标识
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const config = pageConfigs[currentPage] || pageConfigs['index'];
    
    // 初始化粒子效果
    particlesJS('particles-js', {
        particles: config.particles,
        interactivity: config.interactivity
    });
    
    // 确保粒子容器不会遮挡内容
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.pointerEvents = 'none';
    }
});

// 备用CDN加载
if (typeof particlesJS === 'undefined') {
    const script = document.createElement('script');
    script.src = 'js/particles.min.js';
    script.onload = function() {
        console.log('particles.js从本地加载成功');
        document.dispatchEvent(new Event('DOMContentLoaded'));
    };
    script.onerror = function() {
        console.error('particles.js从本地加载失败');
    };
    document.head.appendChild(script);
}

// PWA安装提示
let deferredPrompt;
const installBtn = document.createElement('div');
installBtn.className = 'install-btn fade-in';
installBtn.innerHTML = '<i class="fas fa-download"></i> 安装应用';
installBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4b0082;
  color: white;
  padding: 12px 18px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 999;
  font-size: 16px;
  font-weight: bold;
  display: none;
`;
document.body.appendChild(installBtn);

// 调试信息
console.log('PWA安装提示脚本已加载');

// 检查PWA安装条件
function checkPWAInstallable() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
        console.log('应用已安装为PWA');
        return false;
    }
    
    // 检查是否满足PWA安装条件
    const hasSW = 'serviceWorker' in navigator;
    const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
    const isHTTPS = window.location.protocol === 'https:';
    
    console.log('PWA安装条件检查:',
        `ServiceWorker: ${hasSW}`,
        `Manifest: ${hasManifest}`,
        `HTTPS: ${isHTTPS}`
    );
    
    return hasSW && hasManifest && isHTTPS;
}

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt事件触发');
    e.preventDefault();
    deferredPrompt = e;
    
    if (checkPWAInstallable()) {
        installBtn.style.display = 'block';
        console.log('显示安装按钮');
    } else {
        console.log('不满足PWA安装条件');
    }
    
    installBtn.addEventListener('click', () => {
        if (!deferredPrompt) {
            console.log('没有可用的安装提示');
            return;
        }
        
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('用户接受安装');
            } else {
                console.log('用户拒绝安装');
            }
            deferredPrompt = null;
        });
    });
});

// 添加手动触发选项
if (checkPWAInstallable()) {
    setTimeout(() => {
        if (!deferredPrompt) {
            console.log('未收到自动安装提示，显示手动安装按钮');
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', () => {
                alert('请使用浏览器的"添加到主屏幕"功能安装应用');
            });
        }
    }, 5000);
}

window.addEventListener('appinstalled', () => {
    console.log('应用已安装');
    installBtn.style.display = 'none';
});
