/* app.js — SoulBridge */
(function(){
  'use strict';

  /* THEME — restore before paint */
  var html = document.documentElement;
  var saved = localStorage.getItem('sb-theme');
  if(saved === 'light') html.setAttribute('data-theme','light');

  function setTheme(t){ html.setAttribute('data-theme',t); localStorage.setItem('sb-theme',t); }
  function toggle(){ setTheme(html.getAttribute('data-theme')==='light' ? 'dark' : 'light'); }

  document.addEventListener('DOMContentLoaded', function(){

    /* Wire all theme toggles */
    document.querySelectorAll('.js-theme').forEach(function(b){ b.addEventListener('click', toggle); });

    /* Smooth scroll — ALL hash links including logo */
    document.querySelectorAll('a[href^="#"], button[data-href]').forEach(function(el){
      el.addEventListener('click', function(e){
        var href = el.getAttribute('href') || el.getAttribute('data-href');
        if(!href || href === '#'){
          e.preventDefault();
          window.scrollTo({top:0, behavior:'smooth'});
          return;
        }
        var t = document.querySelector(href);
        if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    });

    /* Logo button scroll to top */
    var logoBtn = document.querySelector('.logo');
    if(logoBtn){
      logoBtn.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({top:0, behavior:'smooth'});
      });
    }

    /* Burger / mobile menu */
    var burger = document.querySelector('.js-burger');
    var mob = document.querySelector('.js-mob');
    if(burger && mob){
      burger.addEventListener('click', function(){
        var o = mob.classList.toggle('open');
        burger.setAttribute('aria-expanded', o);
      });
      mob.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          mob.classList.remove('open');
          burger.setAttribute('aria-expanded','false');
        });
      });
    }

    /* Scroll reveal */
    var els = document.querySelectorAll('.rv');
    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      },{threshold:0.1, rootMargin:'0px 0px -30px 0px'});
      els.forEach(function(el){ obs.observe(el); });
    } else { els.forEach(function(el){ el.classList.add('in'); }); }

    /* FAQ accordion */
    document.querySelectorAll('.js-faq').forEach(function(btn){
      btn.addEventListener('click', function(){
        var item = btn.closest('.faq-item');
        var open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function(i){
          i.classList.remove('open');
          i.querySelector('.js-faq').setAttribute('aria-expanded','false');
        });
        if(!open){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
      });
    });

    /* Waitlist form */
    var form = document.getElementById('wl-form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var ne = document.getElementById('wl-name');
        var ee = document.getElementById('wl-email');
        var co = document.getElementById('wl-country').value.trim();
        var re = document.getElementById('wl-reason').value.trim();
        var n = ne.value.trim(), em = ee.value.trim();
        ne.classList.remove('err'); ee.classList.remove('err');
        if(!n){ ne.classList.add('err'); ne.focus(); return; }
        if(!em){ ee.classList.add('err'); ee.focus(); return; }
        var subj = 'SoulBridge Waitlist: ' + n;
        var body = 'New SoulBridge Waitlist Signup\n\nName: ' + n + '\nEmail: ' + em +
          '\nCountry: ' + (co||'Not provided') + '\nNotes: ' + (re||'None') +
          '\n\nSubmitted: ' + new Date().toLocaleString();
        window.location.href = 'mailto:support.soulbridge@gmail.com?subject=' +
          encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
        setTimeout(function(){
          var bd = document.getElementById('wl-body');
          var ok = document.getElementById('wl-ok');
          if(bd) bd.style.display='none';
          if(ok) ok.classList.add('show');
        }, 900);
      });
    }

  });
})();
