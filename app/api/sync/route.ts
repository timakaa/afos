import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

interface SyncRequest {
  coins: number;
  energy: number;
  timeStamp: number;
}

const ENERGY_RECOVERY_RATE = 1; // единица энергии в секунду
const MAX_ENERGY = 100; // Максимальная энергия

// Объект, определяющий количество коинов за клик для каждого уровня
const coinsPerClick: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  // Добавьте дополнительные уровни по необходимости
};

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неавторизованный доступ" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const data: SyncRequest = await request.json();
    const { coins, energy, timeStamp } = data;

    // Current time in seconds
    const currentTime = Date.now();

    // Проверка timeStamp
    if (timeStamp > currentTime) {
      return NextResponse.json(
        { error: "Некорректный timestamp: время не может быть в будущем." },
        { status: 400 },
      );
    }

    if (typeof coins !== "number" || coins < 0) {
      return NextResponse.json(
        { error: "Неверное количество коинов." },
        { status: 400 },
      );
    }

    if (typeof energy !== "number" || energy < 0) {
      return NextResponse.json(
        { error: "Неверное количество энергии." },
        { status: 400 },
      );
    }

    // Получаем пользователя из базы данных
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { error: "Пользователь не найден." },
        { status: 404 },
      );
    }

    // Вычисляем время, прошедшее с последнего клика
    const elapsedTime = timeStamp - (user.lastCoinsUpdateTimestamp || 0);

    if (elapsedTime < 0) {
      return NextResponse.json(
        {
          error:
            "Некорректный timestamp: время должно быть больше или равно последнему клику.",
        },
        { status: 400 },
      );
    }

    // Восстанавливаем энергию
    const recoveredEnergy = Math.floor(elapsedTime * ENERGY_RECOVERY_RATE);
    const maxPossibleEnergy = Math.min(
      (user.energy || 0) + recoveredEnergy,
      MAX_ENERGY,
    );

    // Рассчитываем максимально возможные коины за прошедшее время
    const levelIndex = user.multitapLevelIndex || 1;
    const coinsPerThisClick = coinsPerClick[levelIndex] || 1;
    const maxPossibleCoins =
      Math.floor(maxPossibleEnergy / 10) * coinsPerThisClick; // Предполагаем, что sent_energy = 10

    // Валидация количества коинов
    if (coins > maxPossibleCoins) {
      return NextResponse.json(
        {
          error: `Некорректное количество коинов: максимальное возможное за это время - ${maxPossibleCoins}.`,
        },
        { status: 400 },
      );
    }

    // Валидация энергии
    if (
      (user.energy || 0) +
        recoveredEnergy -
        coinsPerThisClick * (coins / coinsPerThisClick) <
      energy
    ) {
      return NextResponse.json(
        { error: "Отправленная энергия превышает допустимую." },
        { status: 400 },
      );
    }

    // Рассчитываем возможные клики на основе отправленной энергии
    const possible_clicks = Math.floor(maxPossibleEnergy / 10); // Предполагаем, что sent_energy = 10

    // Обновляем энергию и коины пользователя
    await prisma.user.update({
      where: { id: userId },
      data: {
        energy: maxPossibleEnergy - possible_clicks * 10,
        lastCoinsUpdateTimestamp: timeStamp,
        coins: (user.coins || 0) + coins,
      },
    });
    return NextResponse.json(
      {
        possible_clicks,
        remaining_energy: user.energy,
        coins_earned: coins,
        total_coins: user.coins,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера." },
      { status: 500 },
    );
  }
}
