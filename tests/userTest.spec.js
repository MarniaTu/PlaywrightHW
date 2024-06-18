const { test, expect } = require('@playwright/test');

const { email, password } = require('../user');

// другой вариант импорта
// import { test, expect } from '@playwright/test';

// import { email, password } from '../user';


test('successfull authorization', async ({ page }) => {

  test.setTimeout(350000);

  await page.goto('https://netology.ru/');
  await page.screenshot({ path: 'screenshot1.png' });
  await expect(page.getByText('Войти')).toBeVisible();
  await page.getByRole('link', { name: 'Войти' }).click();

  await page.goto('https://netology.ru/?modal=sign_in');
  await page.screenshot({ path: 'screenshot2.png' });
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();

  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();

  await page.goto('https://netology.ru/profile/8862654');
  await expect(page).toHaveURL("https://netology.ru/profile/8862654");
  await expect(page.getByRole('heading', { name: 'Моё обучение'}, {timeout: 15000})).toBeVisible();
  await page.screenshot({ path: 'screenshot3.png' });
  
   
});


test('authorization failure', async ({ page }) => {

  test.setTimeout(350000);

  await page.goto('https://netology.ru/');
  await page.goto('https://netology.ru/?modal=sign_in');
  
  await page.getByPlaceholder('Email').fill('12345@gmail.com');
  await page.getByPlaceholder('Пароль').fill('12345');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.getByTestId('login-error-hint')).toBeVisible();
  await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');
 
});

