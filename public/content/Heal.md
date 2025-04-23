<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">🛠️ Tools </a>
<a href="#lesson" style="color: #007bff; text-decoration: none; margin: 0 10px;">📌 Lessons Learned </a>

</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            Heal Em Up is a 4-month mobile game school project I worked on with 10 other people (3GP,3GA,4GD). In the game, you play as a healer managing real-time actions like healing, shielding, or buffing teammates with limited mana. Your AI teamates fight bosses 
        </p>
        <p style="margin-bottom: 1.2rem;">
            I implemented advanced features such as :
            <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            <li>Scriptable Object-driven card mechanics</li>
            <li>Custom mobile input system</li>
            <li>Mana system</li>
            <li>Card inventory</li>
        </ul>
        </p>
        <p>
            Using Unity Engine and C#, I implemented various gameplay elements such as dragging and dropping items, scriptable object based card mechanics, card inventory, mana management and card playing and recharging.
        </p>
        <p>
            This project not only solidified my understanding of mobile game developent but also helped me better understand the unity engine and use tools such as scriptables objects and coroutines.
        </p>
    </div>
    <img src="https://i.imgur.com/IKdsLS3.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>

<div id="game" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👾 Gameplay </h2>
        <ul style="font-size: 120%;">
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Scriptable Object-driven card mechanics</span>
                <p style="margin-bottom: 1.2rem;">
                    <p>I implemented a card system using Unity ScriptableObjects to streamline ability creation.</p>
                    <p>This system helped designers to craft cards with effects like :</p>
                    <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
                    <li>Targeted healing</li>
                    <li>Resurrection (reviving allies at partial health)</li>
                    <li>Mana refund mechanics</li> 
                    <li>Shields</li>
                    To enhance usability, I utilized conditional Inspector fields (via NaughtyAttributes) for clean data entry and added save/load functionality to persist unlocked cards. The modular architecture allowed rapid iteration, supporting 10+ unique card types and seamless collaboration between programmers and designers.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/UTdRz9t.gif"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        CardBase.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public enum CardBehaviour
    {
        heal,
        massHeal,
        regeneration,
        resurection,
        panacea,
        spiritShield,
        resonanceShield,
        blessingOfStrength,
        manaProfusion,
        initiative
    }


    [CreateAssetMenu(fileName = "CardBase", menuName = "ScriptableObjects/CardBase")]
    public class CardBase : ScriptableObject
    {
        [Header("If your not a GP don't touch!")]
        public ManaObject manaObject;
        public InputHandlerObject input;
        public AllReferences refs;

        [Space(30)]

        public bool isUnlocked;
        public int dataIndex;
        public CardBehaviour cardBehaviour;
        public string cardName;
        [TextArea]
        public string description;
        public Sprite cardSprite;
        public Sprite cardSpriteGrey;
        public int manaCost;

        bool doHeal
        {
            get
            {
                return cardBehaviour == CardBehaviour.heal || cardBehaviour == CardBehaviour.regeneration  || cardBehaviour == CardBehaviour.massHeal || cardBehaviour == CardBehaviour.panacea;
            }
        }

        bool isTurnDependant
        {
            get
            {
                return cardBehaviour == CardBehaviour.regeneration || cardBehaviour == CardBehaviour.resonanceShield || cardBehaviour == CardBehaviour.blessingOfStrength;
            }
        }

        [ShowIf("doHeal")]
        public int healthHealed;

        [ShowIf("isTurnDependant")]
        public int turnActive;

        [ShowIf("cardBehaviour", CardBehaviour.resurection)]
        public float healthPercentage;

        [ShowIf("cardBehaviour", CardBehaviour.spiritShield)]
        public int shieldBreakAfter;

        [ShowIf("cardBehaviour", CardBehaviour.blessingOfStrength)]
        public int damageAdded;

        public bool ApplyEffectOfTheCard(Character partyMember)
        {

            Status s = partyMember.GetStatus(Status.StatusEnum.Disapeared);
            switch (cardBehaviour)
            {
                
                case CardBehaviour.heal:
                    if ((partyMember.GetCurrentHealth() == partyMember.GetMaxHealth()) || partyMember.IsDead() || s != null)
                    {
                        return false;
                    }
                    partyMember.GetComponent<IHealable>().Heal(healthHealed);
                    partyMember.GetComponent<ICharacter>().GetParticulHandeler().ActiveEffect(ParticulesHandeler.CardEffect.Heal);
                    break;
                case CardBehaviour.resurection:
                    if(!partyMember.IsDead() || s !=null)
                    {
                        return false;
                    }
                    partyMember.Revive(healthPercentage);
                    partyMember.GetComponent<ICharacter>().GetParticulHandeler().ActiveEffect(ParticulesHandeler.CardEffect.Ressurect);
                    break;

                case CardBehaviour.manaProfusion:
                    manaObject.manaRestauration = true;
                    manaObject.manaRestaurationTurn = refs.fightManager.CurrentTurn;
                    break;

                case CardBehaviour.massHeal:
                    int i = 0;
                    foreach (var item in refs.fightManager.PartyMembers)
                    {
                        if (item.GetCurrentHealth() < item.GetMaxHealth() && !item.IsDead() && s == null)
                        {
                            item.GetComponent<IHealable>().Heal(healthHealed);
                            item.GetParticulHandeler().ActiveEffect(ParticulesHandeler.CardEffect.Heal);
                        }
                        else
                        {
                            i++;
                        }
                    }
                    if (i == refs.fightManager.PartyMembers.Length)
                    {
                        return false;
                    }
                    break;
                case CardBehaviour.panacea:
                    if (partyMember.GetCurrentHealth() < partyMember.GetMaxHealth() && !partyMember.IsDead() && s ==null)
                    {
                        partyMember.GetComponent<IHealable>().Heal(healthHealed);
                        partyMember.GetComponent<ICharacter>().GetParticulHandeler().ActiveEffect(ParticulesHandeler.CardEffect.Panacea);
                        foreach (var item in partyMember.Status.ToList())
                        {
                            partyMember.TryRemoveStatus(item.status);
                        }
                    }
                    else
                    {
                        return false;
                    }
                    break;

                case CardBehaviour.spiritShield:
                    if (partyMember.IsDead() || s != null)
                    {
                        return false;
                    }
                    partyMember.AddStatus(new Status(Status.StatusEnum.Shielded, 1));
                    partyMember.GetComponent<ICharacter>().GetParticulHandeler().ActiveShield(Status.StatusEnum.Shielded);
                    break;

                case CardBehaviour.regeneration:
                    if (partyMember.IsDead() || s != null)
                    {
                        return false;
                    }
                    partyMember.AddStatus(new Status(Status.StatusEnum.Regenerating,turnActive,healthHealed));
                    break;

                case CardBehaviour.resonanceShield:
                    if (partyMember.IsDead() || s != null)
                    {
                        return false;
                    }
                    partyMember.AddStatus(new Status(Status.StatusEnum.ShieldedWithReflect, turnActive));
                    partyMember.GetComponent<ICharacter>().GetParticulHandeler().ActiveShield(Status.StatusEnum.ShieldedWithReflect);
                    break;

                case CardBehaviour.initiative:
                    if (partyMember.IsDead() || s != null)
                    {
                        return false;
                    }
                    partyMember.AddStatus(new Status(Status.StatusEnum.Initiative, 1));
                    refs.fightManager.OrderCharacters();
                    break;

                case CardBehaviour.blessingOfStrength:
                    if (partyMember.IsDead() || s != null)
                    {
                        return false;
                    }
                    partyMember.AddStatus(new Status(Status.StatusEnum.Strengthened, turnActive, damageAdded));
                    partyMember.GetParticulHandeler().ActiveEffect(Status.StatusEnum.Strengthened);
                    break;
            }

                Debug.Log($"{manaObject.manaRestauration} && {manaObject.manaRestaurationTurn} && {refs.fightManager.CurrentTurn}");
            manaObject.ReduceMana(manaCost);
            if (manaObject.manaRestauration && manaObject.manaRestaurationTurn < refs.fightManager.CurrentTurn)
            {
                manaObject.AddMana(manaCost);
                manaObject.manaRestauration = false;
            }
            return true;
        }

        [Button("TestSave")]
        public void Save()
        {
            GameData gameData;
            gameData = SaveSystem.Load();
            gameData.spellUnlocked[dataIndex] = isUnlocked;
            SaveSystem.save(gameData);
        }

        [Button("TestLoad")]
        public void Load()
        {
            GameData gameData;
            gameData = SaveSystem.Load();
            isUnlocked = gameData.spellUnlocked[dataIndex];
        }
    }


</div>
</div>
    </details>
</li>
    <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Custom mobile input system</span>
                <p style="margin-bottom: 1.2rem;">
                    <p>I implemented a custom mobile input system using colliders and number of fingers on the screen.</p>
                    <p>With custom behavior like dragging and droping and long press</p>
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/Ig9j5CN.gif"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        InteractInput.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    interface IInteractable
    {
        public void Interact();
        public void Cancel();

        public void InteractTween();
        public void DropTween();
        
    }

    interface IToolTip
    {
        public void ShowToolTip(ToolTip tooltip);
    }

    public class InteractInput : MonoBehaviour
    {
        [SerializeField] InputHandlerObject _inputs;
        [SerializeField] AllReferences refs;
        [SerializeField] float secondsForToolTip = 1f;
        [SerializeField] float value = 0.7f;
        [SerializeField] ToolTip toolTipCanva;
        Coroutine _dragCoroutine = null;
        Coroutine _toolTipCoroutine = null;
        GameObject _getObject;
        bool wasTooltip = false;

        private void Start()
        {
            _inputs.pressedEvent += Interact;
            _inputs.unPressedEvent += Drop;
            refs.fightManager.OnTurnEnd += CanceledDrop;
            _inputs.cancel += CanceledDrop;
        }

        private void OnDestroy()
        {
            _inputs.pressedEvent -= Interact;
            _inputs.unPressedEvent -= Drop;
            refs.fightManager.OnTurnEnd -= CanceledDrop;
            _inputs.cancel -= CanceledDrop;

        }
        void Interact()
        {
            
            if(Input.touchCount > 0)
            {
                Collider2D col = Physics2D.OverlapCircle(Camera.main.ScreenToWorldPoint(Input.touches[0].position), 0.2f);
                if (col != null)
                {
                    _getObject = col.gameObject;
                    if (_getObject.CompareTag("Grabbable"))//Drag if Grabbable
                    {
                        _getObject.GetComponent<IInteractable>().InteractTween();
                        _dragCoroutine = StartCoroutine(Drag());
                    }
                    else if(_getObject.CompareTag("ToolTip"))
                    {
                        _toolTipCoroutine = StartCoroutine(WaitForTooltip());
                    }
                }
            }
        }

        void Drop()
        {
            
            if (_getObject != null) // Check if we got object to interact with
            {
                if (!wasTooltip)
                {
                    if (_getObject.GetComponent<IInteractable>() != null)
                    {
                        //_getObject.transform.DOScale(_getObject.transform.localScale / 1.15f, 0.2f);
                        _getObject.GetComponent<IInteractable>().DropTween();
                        _getObject.GetComponent<IInteractable>().Interact();//Interact with object
                    }
                }
                
                if (_dragCoroutine != null)
                {
                    StopCoroutine(_dragCoroutine);
                    _dragCoroutine = null;
                }

                _getObject = null;
            }

            if (_toolTipCoroutine != null)
            {
                StopCoroutine(_toolTipCoroutine);
                _toolTipCoroutine = null;
            }

            if(wasTooltip)
            {
                wasTooltip = false;
                toolTipCanva.gameObject.SetActive(false);
            }
        }

        IEnumerator Drag()
        {
            float time = Time.time;
            float waitTime = time + secondsForToolTip;
            bool stopToolTip = false;
            while (true)
            {
                if(Input.touches.Length > 0 && _getObject != null)
                {
                    if(!stopToolTip)
                    {
                        if (((Vector2)(Camera.main.ScreenToWorldPoint(Input.touches[0].position) - _getObject.transform.position)).magnitude <= value)
                        {
                            if (time < waitTime)
                            {
                                time += Time.deltaTime;
                            }
                            else
                            {
                                stopToolTip = true;
                                ToolTip();
                                CanceledDrop();
                            }
                        }
                        else
                        {
                            stopToolTip = true;
                        }
                    }
                    else
                    {
                        _getObject.transform.position = Camera.main.ScreenToWorldPoint(Input.touches[0].position) + Vector3.forward * 10f;
                    }

                }
                else
                {
                    //CanceledDrop();
                }
                yield return null;
            }
        }

        void CanceledDrop()
        {
            if(_dragCoroutine != null)
            {
                if (_getObject != null) // Check if we got object to interact with
                {
                    _getObject.GetComponent<IInteractable>().DropTween();
                    if (_getObject.GetComponent<IInteractable>() != null)
                    {
                        _getObject.GetComponent<IInteractable>().Cancel();//Interact with object
                    }
                    _getObject = null;
                }
                StopCoroutine(_dragCoroutine);
                _dragCoroutine = null;
            }
        }

        void ToolTip()
        {
            wasTooltip = true;
            toolTipCanva.gameObject.SetActive(true);
            if(_getObject != null && _getObject.GetComponent<IToolTip>() != null)
            {
                _getObject.GetComponent<IToolTip>().ShowToolTip(toolTipCanva);
            }
        }

        IEnumerator WaitForTooltip()
        {
            wasTooltip = true;
            yield return new WaitForSeconds(secondsForToolTip);
            toolTipCanva.gameObject.SetActive(true);
            if (_getObject != null && _getObject.GetComponent<IToolTip>() != null)
            {
                _getObject.GetComponent<IToolTip>().ShowToolTip(toolTipCanva);
            }
        }
    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Mana System</span>
                <p style="margin-bottom: 1.2rem;">
                    <p>I implemented a custom mobile input system using colliders and number of fingers on the screen.</p>
                    <p>With custom behavior like dragging and droping and long press</p>
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/HHrWeCV.gif"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        ManaHandler.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>
    [CreateAssetMenu(fileName = "ManaEventHandler", menuName = "ScriptableObjects/ManaEventHandler")]
    public class ManaHandler : ScriptableObject
    {
        public float currentMana;
        public float maxMana = 10f;
        public int increaseManaTurn;

        [HideInInspector]
        public int turnsNumber;
        [HideInInspector]
        public bool manaRestauration;
        [HideInInspector]
        public int manaRestaurationTurn;
        [HideInInspector]
        public bool isManaBoost;

        public event Action manaUpdate;
        public event Action manaAddTurn;

        private void Awake()
        {
            manaRestaurationTurn = 0;
            manaRestauration = false;
        }
        public void AddMana(int amount)
        {
            if (amount > 0f)
            {
                currentMana += amount;
                if (currentMana >= maxMana) currentMana = maxMana;
                manaUpdate?.Invoke();
            }
        }

        public void ReduceMana(int amount)
        {
            if (amount > 0f)
            {
                currentMana -= amount;
                if (currentMana <= 0f) currentMana = 0f;
                manaUpdate?.Invoke();
            }
        }

        public void ManaAddTurn()
        {
            manaAddTurn?.Invoke();
        }


        [Button]
        void AddMana()
        {
            AddMana(2);
        }

        [Button]
        void ReduceMana()
        {
            ReduceMana(2);
        }
    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Card Inventory</span>
                <p style="margin-bottom: 1.2rem;">
                    <p>I implemented a custom mobile input system using colliders and number of fingers on the screen.</p>
                    <p>With custom behavior like dragging and droping and long press</p>
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/Cpy2QUc.gif"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        ManaHandler.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>
    [CreateAssetMenu(fileName = "ManaEventHandler", menuName = "ScriptableObjects/ManaEventHandler")]
    public class ManaHandler : ScriptableObject
    {
        public float currentMana;
        public float maxMana = 10f;
        public int increaseManaTurn;

        [HideInInspector]
        public int turnsNumber;
        [HideInInspector]
        public bool manaRestauration;
        [HideInInspector]
        public int manaRestaurationTurn;
        [HideInInspector]
        public bool isManaBoost;

        public event Action manaUpdate;
        public event Action manaAddTurn;

        private void Awake()
        {
            manaRestaurationTurn = 0;
            manaRestauration = false;
        }
        public void AddMana(int amount)
        {
            if (amount > 0f)
            {
                currentMana += amount;
                if (currentMana >= maxMana) currentMana = maxMana;
                manaUpdate?.Invoke();
            }
        }

        public void ReduceMana(int amount)
        {
            if (amount > 0f)
            {
                currentMana -= amount;
                if (currentMana <= 0f) currentMana = 0f;
                manaUpdate?.Invoke();
            }
        }

        public void ManaAddTurn()
        {
            manaAddTurn?.Invoke();
        }


        [Button]
        void AddMana()
        {
            AddMana(2);
        }

        [Button]
        void ReduceMana()
        {
            ReduceMana(2);
        }
    }

</div>
                </details>
            </li>
        </ul>
    </div>
</div>



<div id="lesson" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">📌 Lessons Learned</h2>
        <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            <li>Learned C# events</li>
            <li>Learned Scriptable Object style singleton</li>
            <li>Play Store Publishing</li>
            <li>Use PointerHandler interfaces instead of custom system</li>
        </ul>
    </div>
</div>