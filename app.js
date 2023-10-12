const hero = {
    hp: 1000,
    str: 20,
    def: 0,
    as: 1,
    ls: 0,
    cr: 10,
    cd: 150,
    dodge: 0,
    money: 9999999999,
    crupgrade: 0,
    defupgrade: 0,
    dodgeupgrade: 0,
};

const prices = {
    hp: 100,
    str: 100,
    def: 100,
    as: 100,
    ls: 100,
    cr: 100,
    cd: 100,
    dodge: 100,
};

const enemies = {
    level1: {
        name: "Level 1",
        hp: 50,
        str: 10,
        as: 1,
        gold: 101,
        mingold: 100,
    },
    level5: {
        name: "Level 5",
        hp: 500,
        str: 100,
        as: 1,
        gold: 501,
        mingold: 500,
    },
    level15: {
        name: "Level 15",
        hp: 5000,
        str: 200,
        as: 1,
        gold: 5001,
        mingold: 5000,
    },
    firstboss: {
        name: "First Boss",
        hp: 10000,
        str: 350,
        as: 2,
        gold: 25001,
        mingold: 25000,
    },
    level30: {
        name: "Level 30",
        hp: 15000,
        str: 400,
        as: 2,
        gold: 50001,
        mingold: 50000,
    },
    level40: {
        name: "Level 40",
        hp: 25000,
        str: 400,
        as: 3,
        gold: 50001,
        mingold: 100000,
    },
    level50: {
        name: "Level 50",
        hp: 40000,
        str: 500,
        as: 4,
        gold: 100001,
        mingold: 150000,
    },
    secondboss: {
        name: "Second Boss",
        hp: 100000,
        str: 700,
        as: 5,
        gold: 500001,
        mingold: 500000,
    },
}

let storedHero = JSON.parse(localStorage.getItem('heroData'));
if (!storedHero) {
    storedHero = hero;
    localStorage.setItem('heroData', JSON.stringify(storedHero));
}

let storedPrice = JSON.parse(localStorage.getItem('priceData'));
if (!storedPrice) {
    storedPrice = prices;
    localStorage.setItem('priceData', JSON.stringify(storedPrice));
}

function updateHeroStat(id, value) {
    const statElement = document.getElementById(id);
    statElement.textContent = value;
}

function updatePrice(id, value) {
    const priceElement = document.getElementById(id + "price");
    priceElement.textContent = value;
}

function updateBattleHP(value, id) {
    const battleHP = document.getElementById(id);
    battleHP.textContent = value;
}

function updateTotalGold(value) {
    const totalGold = document.getElementById("currentgold");
    totalGold.textContent = value;
}

function buyItem(item, price, value, rate) {
    storedHero.money -= price;
    storedHero[item] += value;
    storedHero[item] = parseFloat(storedHero[item].toFixed(2));
    localStorage.setItem('heroData', JSON.stringify(storedHero));
    storedPrice[item] = Math.floor(price * rate);
    localStorage.setItem('priceData', JSON.stringify(storedPrice));
}

function statMaxed(item) {
    storedPrice[item] = "MAX";
    localStorage.setItem('priceData', JSON.stringify(storedPrice));
}

function resetData() {
    localStorage.setItem('heroData', JSON.stringify(hero));
    localStorage.setItem('priceData', JSON.stringify(prices));
    localStorage.setItem('helmetData', JSON.stringify(helmets));
    location.reload();
}

function appendMessage(message) {
    const messageBox = document.getElementById('logwindow');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    messageBox.appendChild(newMessage);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playerbody").innerHTML = '<img src="./assets/player0.png" />';
    const resetButton = document.getElementById("resetdata");
    resetButton.addEventListener("click", () => {resetData(); location.reload();})

    updateHeroStat("stathp", storedHero.hp);
    updateHeroStat("statstr", storedHero.str);
    updateHeroStat("statdef", storedHero.def);
    updateHeroStat("statas", storedHero.as);
    updateHeroStat("statls", storedHero.ls);
    updateHeroStat("statcr", storedHero.cr);
    updateHeroStat("statcd", storedHero.cd);
    updateHeroStat("statdodge", storedHero.dodge);
    updateTotalGold(storedHero.money);

    updatePrice("hp", storedPrice.hp);
    updatePrice("str", storedPrice.str);
    updatePrice("def", storedPrice.def);
    updatePrice("as", storedPrice.as);
    updatePrice("ls", storedPrice.ls);
    updatePrice("cr", storedPrice.cr);
    updatePrice("cd", storedPrice.cd);
    updatePrice("dodge", storedPrice.dodge);

    updateBattleHP(storedHero.hp, "playerhealth");

    const hpButton = document.getElementById("hpbutton");
    hpButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.hp > 0) {
            buyItem("hp", storedPrice.hp, 100, 1.05);
            updateTotalGold(storedHero.money);
            updateHeroStat("stathp", storedHero.hp);
            updatePrice("hp", storedPrice.hp);
            updateBattleHP(storedHero.hp, "playerhealth");}
    });

    const strButton = document.getElementById("strbutton");
    strButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.str > 0) {
            buyItem("str", storedPrice.str, 10, 1.3);
            updateTotalGold(storedHero.money);
            updateHeroStat("statstr", storedHero.str);
            updatePrice("str", storedPrice.str);
        }
    });

    const defButton = document.getElementById("defbutton");
    defButton.addEventListener("click", () => {
     if (storedHero.money - storedPrice.def > 0 && storedHero.defupgrade < 10) {
            storedHero.defupgrade += 1;
            buyItem("def", storedPrice.def, 4, 2.5);
            updateTotalGold(storedHero.money);
            updateHeroStat("statdef", storedHero.def);
            updatePrice("def", storedPrice.def);
            if (storedHero.defupgrade === 10) {
                defButton.textContent = "MAX";
                statMaxed("def");
                updatePrice("def", storedPrice.def);
            }
        }
    });

    const asButton = document.getElementById("asbutton");
    asButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.as > 0) {
            buyItem("as", storedPrice.as, 0.1, 2);
            updateTotalGold(storedHero.money);
            updateHeroStat("statas", storedHero.as);
            updatePrice("as", storedPrice.as);
        }
    });

    const lsButton = document.getElementById("lsbutton");
    lsButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.ls > 0 && storedHero.ls < 40) {
            buyItem("ls", storedPrice.ls, 2, 1.5);
            updateTotalGold(storedHero.money);
            updateHeroStat("statls", storedHero.ls);
            updatePrice("ls", storedPrice.ls);
            if (storedHero.ls === 40) {
                lsButton.textContent = "MAX";
                statMaxed("ls");
                updatePrice("ls", storedPrice.ls);
            }
        }
    });

    const crButton = document.getElementById("crbutton");
    crButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.cr > 0 && storedHero.crupgrade < 45) {
            storedHero.crupgrade += 1;
            buyItem("cr", storedPrice.cr, 2, 1.2);
            updateTotalGold(storedHero.money);
            updateHeroStat("statcr", storedHero.cr);
            updatePrice("cr", storedPrice.cr);
            if (storedHero.crupgrade === 45) {
                crButton.textContent = "MAX";
                statMaxed("cr");
                updatePrice("cr", storedPrice.cr);
            }
        }
    });

    const cdButton = document.getElementById("cdbutton");
    cdButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.cd > 0) {
            buyItem("cd", storedPrice.cd, 5, 1.5);
            updateTotalGold(storedHero.money);
            updateHeroStat("statcd", storedHero.cd);
            updatePrice("cd", storedPrice.cd);
        }
    });

    const drButton = document.getElementById("dodgebutton");
    drButton.addEventListener("click", () => {
        if (storedHero.money - storedPrice.dodge > 0 && storedHero.dodgeupgrade < 10) {
            storedHero.dodgeupgrade += 1;
            buyItem("dodge", storedPrice.dodge, 5, 6);
            updateTotalGold(storedHero.money);
            updateHeroStat("statdodge", storedHero.dodge);
            updatePrice("dodge", storedPrice.dodge);
            if (storedHero.dodgeupgrade === 10) {
                drButton.textContent = "MAX";
                statMaxed("dodge");
                updatePrice("dodge", storedPrice.dodge);
            }
        }
    });

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let BattleSpeed = 500;
    function updateBattleSpeed() {
        const selectedRadioButton = document.querySelector('input[name="battlespeed"]:checked');
        if (selectedRadioButton) {
          const selectedValue = selectedRadioButton.value;
          switch (selectedValue) {
            case "1x":
              BattleSpeed = 500;
              break;
            case "2x":
              BattleSpeed = 250;
              break;
            case "10x":
              BattleSpeed = 50;
              break;
            default:
              BattleSpeed = 500;
          }
        }
      };
    
    const battlespeedContainer = document.getElementById("battlespeed-container");
    battlespeedContainer.addEventListener("change", updateBattleSpeed);

    async function startBattle(enemyId) {
        const enemy = enemies[enemyId];
    
        if (enemy) {
            document.getElementById("overlay1").style.display = "block";
            document.getElementById("overlay2").style.display = "block";
            let currentHealth = storedHero.hp;
            updateBattleHP(currentHealth, "playerhealth");
            let gold = Math.floor(Math.random() * enemy.gold) + enemy.mingold;
            const enemyMaxHealth = enemy.hp;
            let enemyHealth = enemy.hp;
            let enemyPercentage = 100;
            function updateEnemyHealthBar() {
                if (enemyPercentage >= 0) {
                    document.getElementById("enemyhealth").style.width = enemyPercentage + "%";
                } else {
                    document.getElementById("enemyhealth").style.width = "0%";
                }
            }
            updateEnemyHealthBar();

            const heroMaxHealth = storedHero.hp;
            let heroPercentage = 100;
            function updateHeroHealthBar() {
                if (heroPercentage >= 0) {
                    document.getElementById("playerhealth").style.width = heroPercentage + "%";
                } else {
                    document.getElementById("playerhealth").style.width = "0%";
                }
            }
    
            while (enemyHealth > 0 && currentHealth > 0) {
                for (let i = 0; i < storedHero.as; i++) {
                    if (storedHero.cr > Math.floor(Math.random() * 101)) {
                        let critAmount = storedHero.cd / 100;
                        
                        await delay(BattleSpeed);
                        const lifestealAmount = ((storedHero.str / 100) * storedHero.ls) * critAmount;
                        currentHealth += lifestealAmount;
    
                        if (currentHealth > storedHero.hp) {
                            currentHealth = storedHero.hp;
                        }
    
                        enemyHealth -= (storedHero.str) * critAmount;
                        enemyPercentage = (enemyHealth / enemyMaxHealth) * 100;
                        updateEnemyHealthBar();
                        updateBattleHP(enemyHealth, "enemyhealth");
                        console.log("Enemy health: " + enemyHealth);
                        await delay(10);
                    } else {
                        await delay(BattleSpeed);
                        const lifestealAmount = (storedHero.str / 100) * storedHero.ls;
                        currentHealth += lifestealAmount;
    
                        if (currentHealth > storedHero.hp) {
                            currentHealth = storedHero.hp;
                        }

                        enemyHealth -= storedHero.str;
                        enemyPercentage = (enemyHealth / enemyMaxHealth) * 100;
                        updateEnemyHealthBar();
                        updateBattleHP(enemyHealth, "enemyhealth");
                        console.log("Enemy health: " + enemyHealth);
                        await delay(10);
                    }
                }
    
                for (let i = 0; i < enemy.as; i++) {
                    if (storedHero.dodge >= Math.floor(Math.random() * 101)) {
                        console.log("You dodged the attack!");
                    } else {
                        await delay(BattleSpeed);
                        let reduction = (enemy.str / 100) * storedHero.dodge;
                        currentHealth -= enemy.str - reduction;
                        heroPercentage = (currentHealth / heroMaxHealth) * 100;
                        updateHeroHealthBar();
                        updateBattleHP(currentHealth, "playerhealth");
                        console.log("Your health: " + currentHealth);
                    }
                    await delay(10);
                }
            }
    
            if (enemyHealth <= 0) {
                storedHero.money += gold;
                localStorage.setItem('heroData', JSON.stringify(storedHero));
                updateTotalGold(storedHero.money);
                appendMessage('Battle result: You won!');
                appendMessage(gold + " gold gained");
            } else {
                appendMessage('Battle result: You lost!');
            }
            currentHealth = storedHero.hp;
            updateBattleHP(currentHealth, "playerhealth");
            heroPercentage = 100;
            updateHeroHealthBar();
            updateBattleHP("?", "enemyhealth");
            enemyPercentage = 100;
            updateEnemyHealthBar();
            document.getElementById("overlay1").style.display = "none";
            document.getElementById("overlay2").style.display = "none";
        }
    }
    

    
    document.getElementById("level1").addEventListener("click", () => startBattle("level1"));
    document.getElementById("level5").addEventListener("click", () => startBattle("level5"));
    document.getElementById("level15").addEventListener("click", () => startBattle("level15"));
    document.getElementById("firstboss").addEventListener("click", () => startBattle("firstboss"));
    document.getElementById("level30").addEventListener("click", () => startBattle("level30"));
    document.getElementById("level40").addEventListener("click", () => startBattle("level40"));
    document.getElementById("level50").addEventListener("click", () => startBattle("level50"));
    document.getElementById("secondboss").addEventListener("click", () => startBattle("secondboss"));


});
