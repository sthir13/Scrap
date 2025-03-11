const puppeteer = require("puppeteer-extra");
//const solver = require("2captcha")("TU_API_KEY_DE_2CAPTCHA");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Ir a la página de login
    await page.goto("https://xdataperu.com/login", { waitUntil: "networkidle2" });

    // Esperar que aparezcan los campos
    await page.waitForSelector('input[name="user_input"]');
    await page.waitForSelector('input[name="pasword"]');

    // Ingresar usuario y contraseña
    await page.type('input[name="user_input"]', "jejeje@jaja.com");
    await page.type('input[name="pasword"]', "1234567890");

    console.log("Resolviendo CAPTCHA...");

 
    const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
puppeteer.use(
  RecaptchaPlugin({
    provider: { id: '2captcha', token: '6Le4RsMqAAAAALnoGXUOOX118aT66N4SyizGF6ZH' },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
)
    // Insertar la respuesta en el campo oculto del CAPTCHA
    await page.evaluate(document.getElementById("g-recaptcha-response").innerHTML="${response}");

    // Esperar unos segundos para asegurarse de que el CAPTCHA se procesa
    await page.waitForTimeout(5000);

    // Hacer clic en el botón de login
    await page.click('button[type="submit"]');

    // Esperar la navegación después del login
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    console.log("Login exitoso. Mantendré la ventana abierta.");

    await new Promise(() => {}); // Mantiene el navegador abierto

  } catch (error) {
    console.error("Error en el scraping:", error);
   // await browser.close();
  }
})();