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
            Heal Em Up is a 4-month mobile game project I worked on with a 10-person team to learn mobile game development. In the game, you play as a healer managing real-time actions like healing, shielding, or buffing teammates with limited mana.
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
                    To enhance usability, I utilized conditional Inspector fields (via NaughtyAttributes) for clean data entry and added save/load functionality to persist unlocked cards. The modular architecture allowed rapid iteration, supporting 10+ unique card types and seamless collaboration between programmers and designers.
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
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Custom mobile input system</span>
                <p>
                    I used Facepunch API to make lobbies when needed, such as when a friend sends an invite or when you want to join a public lobby.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
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
        </div>
        </li>
        <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Scriptable Object-driven card mechanics</span>
                <p>
                    Each player when launching the game create a friends only lobby. Then when the player join a lobby it create or join the steam socket server based on who is the host. The host's SteamId is used as the "key" to connect to the socket server;
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
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
                </details>
            </li>
            <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Custom mobile input system</span>
                <p>
                    I used Facepunch API to make lobbies when needed, such as when a friend sends an invite or when you want to join a public lobby.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
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
    <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Mana system</span>
    <p>
        This class handles the server-side logic that manage player connections, player data, and game states using Steamworks networking. It implements the `ISocketManager` interface to handle events like connecting, disconnecting, and receiving messages.
    </p>
    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            SteamSocketServer.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CreateAssetMenu(fileName = "SteamSocketServer", menuName = "ScriptableObjects/SteamSocketServer", order = 1)]
    public class SteamSocketServer : ScriptableObject, ISocketManager
    {
        [SerializeField] float waitBeforeStart = 3f;
        static int globalPlayerCount = 0;
        Awaitable waitBegin = null;

        static Dictionary&lt;Connection, PlayerData&gt; players = new();

        public void ResetPlayers()
        {
            players.Clear();
        }

        public void OnConnecting(Connection connection, ConnectionInfo info)
        {
            connection.Accept();
            "Client Try To Connect".Log();
        }

        public void OnConnected(Connection connection, ConnectionInfo info)
        {
            "Client is Connected".Log();

            PlayerData playerData = new PlayerData();
            playerData.connection = connection;
            playerData.steamId = info.Identity.SteamId;
            playerData.playerNum = globalPlayerCount;
            players.Add(connection, playerData);
            globalPlayerCount++;

            if (players.Count != SteamManager.instance.maxPlayer) return;

            globalPlayerCount = 0;
            bigGrid = new();
            bigGrid.Clear();
            for (int i = 0; i < 9; i++)
            {
                bigGrid.Add(new SmallGrid());
            }
            waitForAllType = true;

            foreach (var player in players.Keys)
            {
                PacketBuilder.SendPacket(new LoadScene(2), player, SendType.Reliable);
            }
        }

        public void OnDisconnected(Connection connection, ConnectionInfo info)
        {
            connection.Close();
            "Client Disconnected".Log();
        }

        public void OnMessage(Connection connection, NetIdentity identity, IntPtr data, int size, long messageNum, long recvTime, int channel)
        {
            "Server Receive Packet".Log();
            byte[] byteArray = new byte[size];
            Marshal.Copy(data, byteArray, 0, size);
            int offset = 0;
            Opcode opcode = (Opcode)Serialization.DeserializeU16(byteArray, ref offset);
            switch (opcode)
            {
                case Opcode.Message:
                    {
                        MessagePacket packet = MessagePacket.Deserialize<MessagePacket>(byteArray, ref offset);
                        packet.messsage.Log();
                        break;
                    }
                case Opcode.Ready:
                    {
                        if (players.TryGetValue(connection, out PlayerData player))
                        {
                            player.isReady = true;
                            foreach (var playerConnection in players.Keys)
                            {
                                PacketBuilder.SendPacket(new Ready(player.playerNum), playerConnection, SendType.Reliable);
                            }
                        }
                        CheckToStart();
                        break;
                    }
                case Opcode.CancelReady:
                    {
                        if (players.TryGetValue(connection, out PlayerData player))
                        {
                            player.isReady = false;
                            foreach (var playerConnection in players.Keys)
                            {
                                PacketBuilder.SendPacket(new CancelReady(player.playerNum), playerConnection, SendType.Reliable);
                            }
                            CheckToStart();
                        }
                        break;
                    }
                case Opcode.Play:
                    {
                        if (players.TryGetValue(connection, out PlayerData player))
                        {
                            PlayClient playTurnPacket = PlayClient.Deserialize&lt;PlayClient&gt;(byteArray, ref offset);
                            HandleTurnPakcet(player, playTurnPacket.pos, playTurnPacket.bigPos);
                        }
                        break;
                    }
            }
        }
    }
</div>
        </div>
    </details>
</li>
<li style= "padding-bottom: 15px">
    <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Socket Client</span>
    <p>
        This class handles the client-side logic that send the player's inputs to the server and listen to the server packets. The server's message is send to the reacting GameObject by using C# events that sends the packets data. It implements the `IConnectionManager` interface to handle events like connecting, disconnecting, and receiving messages from the server.
    </p>
    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            SteamSocketClient.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CreateAssetMenu(fileName = "SteamSocketClient", menuName = "ScriptableObjects/SteamSocketClient", order = 1)]
    public class SteamSocketClient : ScriptableObject, IConnectionManager
    {
        public int firstTurn = -1;
        public int playerNum = 0;

        public event Action<int, int, int> playTurn;
        public event Action activateAll;
        public event Action<int> activateSpecified;
        public event Action<int, int> smallWin;
        public event Action<int, float,float> timeUpdate;

        public void OnConnected(ConnectionInfo info)
        {

        }

        public void OnConnecting(ConnectionInfo info)
        {

        }

        public void OnDisconnected(ConnectionInfo info)
        {

        }

        public void OnMessage(IntPtr data, int size, long messageNum, long recvTime, int channel)
        {
            byte[] byteArray = new byte[size];
            Marshal.Copy(data, byteArray, 0, size);
            int offset = 0;
            Opcode opcode = (Opcode)Serialization.DeserializeU16(byteArray, ref offset);
            switch (opcode)
            {
                case Opcode.Message:
                    MessagePacket messagePacket = MessagePacket.Deserialize<MessagePacket>(byteArray, ref offset);
                    messagePacket.messsage.Log();
                    break;
                case Opcode.LoadScene:
                    LoadScene loadScenepacket = LoadScene.Deserialize<LoadScene>(byteArray, ref offset);
                    SceneManager.LoadScene(loadScenepacket.scene);
                    break;
                case Opcode.Ready:
                    Ready readypacket = Ready.Deserialize<Ready>(byteArray, ref offset);
                    SteamManager.instance.Ready(readypacket.playerNum);
                    break;
                case Opcode.CancelReady:
                    CancelReady cancelReadypacket = CancelReady.Deserialize<CancelReady>(byteArray, ref offset);
                    SteamManager.instance.CancelReady(cancelReadypacket.playerNum);
                    break;
                case Opcode.InitGame:
                    InitGame initGame = InitGame.Deserialize<InitGame>(byteArray, ref offset);
                    firstTurn = initGame.firstTurn;
                    playerNum = initGame.playerNum;
                    SceneManager.LoadScene(1);
                    break;
                case Opcode.PlayTurn:
                    PlayTurn playTurnPacket = PlayTurn.Deserialize<PlayTurn>(byteArray, ref offset);
                    playTurn?.Invoke(playTurnPacket.playerNum, playTurnPacket.posBig, playTurnPacket.posSmall);
                    timeUpdate?.Invoke(playTurnPacket.playerNum,playTurnPacket.time0,playTurnPacket.time1);
                    break;
                case Opcode.ActivateAll:
                    activateAll?.Invoke();
                    break;
                case Opcode.ActivateSpe:
                    ActivateSpecified activateSpecifiedPacket = ActivateSpecified.Deserialize<ActivateSpecified>(byteArray, ref offset);
                    activateSpecified?.Invoke(activateSpecifiedPacket.pos);
                    break;
                case Opcode.SmallWin:
                    SmallWin smallWinPacket = SmallWin.Deserialize<SmallWin>(byteArray, ref offset);
                    smallWin?.Invoke(smallWinPacket.bigPos, smallWinPacket.playerNum);
                    break;


            }
        }
    }
</div>
        </div>
    </details>
</li>

<p style="background:rgb(26, 26, 26); padding: 0.5rem; margin-bottom: 1rem; border-radius: 2px; text-align: center;" >
        I used <span style="color: #007bff"> Scriptable Objects</span> for the client and the server setup because I could have a reference to these objects whitout being scene dependant. I was inspired by SOAP a unity asset that makes game architecture easier.
    </p>
            <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold; font-size: 120%">Data Serialization</span>
                <p>
                    I created a static class with functiun to serialize and deserialize types such as bytes, ushort, short, uint, int, float, Quaternions, Vectors and Color.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            Serialization.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public static class Serialization
    {
        public static void SerializeColor(List<byte> byteArray, Color value)
        {
            SerializeU8(byteArray, (byte)(value.r));
            SerializeU8(byteArray, (byte)(value.g));
            SerializeU8(byteArray, (byte)(value.b));
            SerializeU8(byteArray, (byte)(value.a));
        }

        public static Color DeserializeColor(byte[] byteArray, ref int offset)
        {
            byte r = DeserializeU8(byteArray, ref offset);
            byte g = DeserializeU8(byteArray, ref offset);
            byte b = DeserializeU8(byteArray, ref offset);
            byte a = DeserializeU8(byteArray, ref offset);

            return new Color(r, g, b, a);
        }

        public static void SerializeVector3(List<byte> byteArray, Vector3 value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
            SerializeF32(byteArray, value.z);
        }

        public static Vector3 DeserializeVector3(byte[] byteArray, ref int offset)
        {
            Vector3 result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            result.z = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeVector2(List<byte> byteArray, Vector2 value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
        }

        public static Vector2 DeserializeVector2(byte[] byteArray, ref int offset)
        {
            Vector2 result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeQuaternion(List<byte> byteArray, Quaternion value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
            SerializeF32(byteArray, value.z);
            SerializeF32(byteArray, value.w);
        }

        public static Quaternion DeserializeQuaternion(byte[] byteArray, ref int offset)
        {
            Quaternion result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            result.z = DeserializeF32(byteArray, ref offset);
            result.w = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeF32(List<byte> byteArray, float value)
        {
            int intRepresentation = BitConverter.ToInt32(BitConverter.GetBytes(value), 0);
            SerializeI32(byteArray, intRepresentation);
        }

        public static float DeserializeF32(byte[] byteArray, ref int offset)
        {
            int intRepresentation = DeserializeI32(byteArray, ref offset);
            return BitConverter.ToSingle(BitConverter.GetBytes(intRepresentation), 0);
        }

        public static void SerializeI8(List<byte> byteArray, sbyte value)
        {
            SerializeU8(byteArray, (byte)value);
        }

        public static sbyte DeserializeI8(byte[] byteArray, ref int offset)
        {
            return (sbyte)DeserializeU8(byteArray, ref offset);
        }

        public static void SerializeI16(List<byte> byteArray, short value)
        {
            SerializeU16(byteArray, (ushort)value);
        }

        public static short DeserializeI16(byte[] byteArray, ref int offset)
        {
            short value = BitConverter.ToInt16(byteArray, offset);
            offset += sizeof(short);
            return IPAddress.NetworkToHostOrder(value);
        }

        public static void SerializeI32(List<byte> byteArray, int value)
        {
            SerializeU32(byteArray, (uint)value);
        }

        public static int DeserializeI32(byte[] byteArray, ref int offset)
        {
            int value = BitConverter.ToInt32(byteArray, offset);
            offset += sizeof(int);
            return IPAddress.NetworkToHostOrder(value);
        }

        public static void SerializeU8(List<byte> byteArray, byte value)
        {
            byteArray.Add(value);
        }

        public static byte DeserializeU8(byte[] byteArray, ref int offset)
        {
            byte value = byteArray[offset];
            offset += sizeof(byte);
            return value;
        }

        public static void SerializeU16(List<byte> byteArray, ushort value)
        {
            value = (ushort)IPAddress.HostToNetworkOrder((short)value);
            byteArray.AddRange(BitConverter.GetBytes(value));
        }

        public static ushort DeserializeU16(byte[] byteArray, ref int offset)
        {
            ushort value = BitConverter.ToUInt16(byteArray, offset);
            offset += sizeof(ushort);
            return (ushort)IPAddress.NetworkToHostOrder((short)value);
        }

        public static void SerializeU32(List<byte> byteArray, uint value)
        {
            value = (uint)IPAddress.HostToNetworkOrder((int)value);
            byteArray.AddRange(BitConverter.GetBytes(value));
        }

        public static uint DeserializeU32(byte[] byteArray, ref int offset)
        {
            uint value = BitConverter.ToUInt32(byteArray, offset);
            offset += sizeof(uint);
            return (uint)IPAddress.NetworkToHostOrder((int)value);
        }

        public static void SerializeString(List<byte> byteArray, string value)
        {
            SerializeU32(byteArray, (uint)value.Length);
            byteArray.AddRange(Encoding.UTF8.GetBytes(value));
        }

        public static string DeserializeString(byte[] byteArray, ref int offset)
        {
            uint length = DeserializeU32(byteArray, ref offset);
            string value = Encoding.UTF8.GetString(byteArray, offset, (int)length);
            offset += (int)length;
            return value;
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
        </ul>
    </div>
</div>