<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#tools" style="color: #007bff; text-decoration: none; margin: 0 10px;">🛠️ Custom Tools </a>

</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            Twice Upon a Time is a 2D local multiplayer platformer developed as a six-month school project. Tasked with creating a vertical slice, my team and we made a narrative-driven experience centered on a brother and sister interacting with a book. The gameplay blends cooperative puzzles—such as manipulating book tabs and rotating wheels and platformer movement. While the narrative does not directly affect gameplay, the duo’s playful banter and discoveries deepen immersion, framing their journey through the book’s imaginative world.
        </p>
    </div>
    <img src="https://i.imgur.com/dNOutQa.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>

<div id="game" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👾 Gameplay</h2>
        <p>
            Twice Upon a Time is a chill and cooperative two-player narrative platformer game.
            In a broken family, a brother and sister find shelter in a book, explore with them a story shaped by their imagination and fantasies.
            In this project I developped features such as :
        </p>
        <ul style="margin-top: 0.5rem;">
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Interface-based interaction system:</strong> General interface that can be used by any GameObject for gameplay interactions. (the value range from 0 to 1 acting as a lerp kind of mechanism). I also made most of the interactions that use this interface such as pulling tabs, turning wheels and bumpers that launch the player.
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            IActivable.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public interface IActivable
    {
        public void UpdateActivable(float value);
        public void Activate(float value);
        public void Desactivate();
    }

</div>
                        </div>
                    </details>
                        <img src="https://i.imgur.com/2htWMtb.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Skin system:</strong> Singleton manager handling base/win/lose skins via ScriptableObjects, persisting across scenes with automatic player detection and skin application. 
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            SkinManager.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class SkinManager : MonoBehaviour
    {
        public static SkinManager instance;

        [SerializeField] HeroSkinScriptableObject baseGirlSkin;
        [SerializeField] HeroSkinScriptableObject baseBoySkin;

        [SerializeField] HeroSkinScriptableObject loseGirlSkin;
        [SerializeField] HeroSkinScriptableObject loseBoySkin;

        [SerializeField] HeroSkinScriptableObject winGirlSkin;
        [SerializeField] HeroSkinScriptableObject winBoySkin;

        PlayerData boy;
        PlayerData girl;

        HeroSkinScriptableObject currentBoy;
        HeroSkinScriptableObject currentGirl;

        private void Start()
        {
            if(instance == null)
            {
                instance = this;
                currentBoy = baseBoySkin;
                currentGirl = baseGirlSkin;
            }
            DontDestroyOnLoad(transform.gameObject);
            SceneManager.sceneLoaded += GetPlayers;
            ApplyAtFirstStart();
        }

        private void GetPlayers(Scene arg0, LoadSceneMode arg1)
        {
            PlayerData[] players = FindObjectsOfType<PlayerData>();
            foreach (var item in players)
            {
                if (item.playerId == 0) boy = item;
                if (item.playerId == 1) girl = item;
            }
            if (boy == null || girl == null) return;
            boy.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(currentBoy);
            girl.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(currentGirl);
        }

        void ApplyAtFirstStart()
        {
            PlayerData[] players = FindObjectsOfType<PlayerData>();
            foreach (var item in players)
            {
                if (item.playerId == 0) boy = item;
                if (item.playerId == 1) girl = item;
            }
            if (boy == null || girl == null) return;
            boy.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(currentBoy);
            girl.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(currentGirl);
        }

        public void BoyWin()
        {
            boy.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(winBoySkin);
            girl.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(loseGirlSkin);
            currentBoy = winBoySkin;
            currentGirl = loseGirlSkin;
        }

        public void GirlWin()
        {
            boy.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(loseBoySkin);
            girl.GetComponentInChildren<HeroAnimator>().ChangeBaseSkin(winGirlSkin);
            currentBoy = loseBoySkin;
            currentGirl = winGirlSkin;
        }
    }


</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/bkEzS5z.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Two Player Camera:</strong> Offers modes like centering between both players or locking to a fixed position/path, which can switch to free movement when triggered
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            MyCamera.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class MyCamera : MonoBehaviour
    {
        enum Pos
        {
            Left,
            Right,
            Middle
        }

        int indexLeft = 0;
        int indexRight = 1;

        [SerializeField] Camera cameraRef;
        [SerializeField] float speed = 0.2f;
        [HideInInspector] public List<Transform> players;
        [SerializeField] List<CameraWaypoint> waypoints;

        void Start()
        {
            List<PlayerData> playersData = FindObjectsByType<PlayerData>(FindObjectsSortMode.None).ToList();
            playersData.ForEach(p => players.Add(p.transform));
        }

        void Update()
        {
            CameraPoint();
        }

        void CameraPoint()
        {
            Bounds bounds = new Bounds(players[0].position, Vector3.zero);
            bounds.Encapsulate(players[1].position);

            if (waypoints[indexLeft].type == WaypointType.Automatic)
            {
                float dot = (((bounds.center.x - waypoints[indexLeft].transform.position.x) * (waypoints[indexRight].transform.position.x - waypoints[indexLeft].transform.position.x)) + ((bounds.center.y - waypoints[indexLeft].transform.position.y) * (waypoints[indexRight].transform.position.y - waypoints[indexLeft].transform.position.y))) / Mathf.Pow(Vector2.Distance(waypoints[indexLeft].transform.position, waypoints[indexRight].transform.position), 2f);
                float X = waypoints[indexLeft].transform.position.x + (dot * (waypoints[indexRight].transform.position.x - waypoints[indexLeft].transform.position.x));
                float Y = waypoints[indexLeft].transform.position.y + (dot * (waypoints[indexRight].transform.position.y - waypoints[indexLeft].transform.position.y));

                switch (PointLine(new Vector2(X, Y)))
                {
                    case Pos.Left:
                        SwitchLeft();
                        break;
                    case Pos.Right:
                        SwitchRight();
                        break;
                    case Pos.Middle:
                        Vector2 pos = Vector2.MoveTowards(cameraRef.transform.position, new Vector2(X, Y), speed);
                        float len1 = Vector2.Distance(pos, waypoints[indexLeft].transform.position);
                        float len2 = Vector2.Distance(pos, waypoints[indexRight].transform.position);
                        cameraRef.orthographicSize = Mathf.Lerp(waypoints[indexLeft].size, waypoints[indexRight].size, len1 / len2);
                        cameraRef.transform.position = new Vector3(pos.x, pos.y, cameraRef.transform.position.z);
                        break;
                }

                if(waypoints[indexRight].IsInside() && waypoints[indexRight].type == WaypointType.Fixed)
                {
                    SwitchRight();
                }
            }
            else
            {
                if(waypoints[indexLeft].IsInside())
                {
                    cameraRef.orthographicSize = waypoints[indexLeft].size;
                    Vector2 pos = Vector2.MoveTowards(cameraRef.transform.position, waypoints[indexLeft].transform.position, speed);
                    cameraRef.transform.position = new Vector3(pos.x, pos.y, cameraRef.transform.position.z);
                }
                else
                {
                    
                    if(bounds.center.x > waypoints[indexLeft].transform.position.x)
                    {
                        SwitchRight();
                    }
                    else
                    {
                        SwitchLeft();
                    }
                }
            }
        }

        Pos PointLine(Vector2 pos)
        {
            int len = (int)Vector2.Distance(waypoints[indexLeft].transform.position, waypoints[indexRight].transform.position);
            float len1 = Vector2.Distance(pos, waypoints[indexLeft].transform.position);
            float len2 = Vector2.Distance(pos, waypoints[indexRight].transform.position);

            if((int)(len1 + len2) == len)
            {
                return Pos.Middle;
            }
            else if(len1 > len2)
            {
                return Pos.Right;
            }
            else
            {
                return Pos.Left;
            }
        }

        public void SwitchRight()
        {
            if (indexRight + 1 < waypoints.Count)
            {
                indexLeft++;
                indexRight++;
            }
        }

        public void SwitchLeft()
        {
            if (indexLeft - 1 >= 0)
            {
                indexLeft--;
                indexRight--;
            }
        }
    }

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/wylx2ky.jpeg" 
                         style="max-width: 100%; border-radius: 12px; display: flex; gap: 10px; margin: auto;">
                </div>
            </li>
        </ul>
    </div>
</div>

<div id="tools" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🛠️ Custom Tools</h2>
        <p>
            As part of this project the teacher gave us the task to make tools for the game designer. I contributed to creating custom tools to streamline workflows in Unity. Key implementations included:
        </p>
        <ul style="margin-top: 0.5rem;">
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Component Linkers Based on Interface Implementation:</strong> Automated component retrieval for specific interfaces
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            LinkerEditor.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    #if(UNITY_EDITOR)
    [CustomEditor(typeof(MyLinker))]
    public class MyLinkerEditor : Editor
    {
        TransformEditorData _data;
        MyLinker _linker;

        List<GameObject> _allActivable = new();
        private void OnEnable()
        {
            _data = (TransformEditorData)AssetDatabase.LoadAssetAtPath("Assets/Scripts/Victor/TransformEditor/TransformEditorTextureData.asset", typeof(TransformEditorData));
            _linker = (MyLinker)target;
            _allActivable = FindObjectsOfType<GameObject>(true).Where(x => x.GetComponent<IActivable>() != null).ToList();
        }

        public override void OnInspectorGUI()
        {
            EditorGUI.BeginChangeCheck();

            GUIStyle style = new GUIStyle(EditorStyles.boldLabel);
            style.normal.textColor = new Color(1f, 1f, 0.5f);
            style.fontSize = 20;
            GUILayout.Label("Linker", style);

            for (int i = 0; i < _linker.activablesLinked.Count; i++)
            {
                var activable = _linker.activablesLinked[i];

                var idActivable = _allActivable.FindIndex(x => x == activable);

                EditorGUILayout.BeginHorizontal();

                idActivable = EditorGUILayout.Popup("", idActivable, _allActivable.Select(x => x.name).ToArray());

                if (GUILayout.Button("X", GUILayout.Width(20)))
                {
                    _linker.activablesLinked.RemoveAt(i);
                    break;
                }

                EditorGUILayout.EndHorizontal();
                _linker.activablesLinked[i] = _allActivable[Mathf.Clamp(idActivable, 0, _allActivable.Count ^ 1)];
            }

            if (GUILayout.Button("Add GameObject to link"))
            {
                GameObject cash = _allActivable[0];
                _linker.activablesLinked.Add(cash);
            }

            EditorUtility.SetDirty(_linker);
            if (EditorGUI.EndChangeCheck())
            {
                EditorUtility.SetDirty(_linker);
            }
        }

        private void OnSceneGUI()
        {
            Handles.color = new Color(0.4f, 1f, 0.4f);
            foreach (var item in _linker.activablesLinked)
            {
                Handles.DrawLine(_linker.transform.position, item.transform.position);
            }
        }
    }
    #endif

</div>
                        </div>
                    </details>
                    <div style="display: flex; gap: 10px; margin: auto;">
                        <img src="https://i.imgur.com/R8vTbpv.gif" style="max-width: 100%; border-radius: 12px;">
                    </div>
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Component Custom Parameters UI:</strong> UI to better understand how to change the gameplay components
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            RoueEditor.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    #if(UNITY_EDITOR)
    [CustomEditor(typeof(RoueData))]
    public class RoueEditor : Editor
    {
        RoueData _myObj;
        TransformEditorData _data;
        RoueInteractable _interactable;
        SphereCollider _interactCollider;


        private void OnEnable()
        {
            _data = (TransformEditorData)AssetDatabase.LoadAssetAtPath("Assets/Scripts/Victor/TransformEditor/TransformEditorTextureData.asset", typeof(TransformEditorData));
            _myObj = (RoueData)target;
            _interactable = _myObj.GetComponentInChildren<RoueInteractable>();
            _interactCollider = _myObj.GetComponentInChildren<SphereCollider>();
            if (_myObj.colorsTypeOne == null)
            {
                _myObj.colorsTypeOne = new List<Color>() { Color.white, Color.white };
            }
            if (_myObj.colorsTypeTwo == null)
            {
                _myObj.colorsTypeTwo = new List<Color>() { Color.white, Color.white, Color.white, Color.white };
            }
        }

        public override void OnInspectorGUI()
        {
            EditorGUI.BeginChangeCheck();
            GUIStyle style = new GUIStyle(EditorStyles.boldLabel);
            style.normal.textColor = new Color(0.5f, 0.5f, 1f);
            style.fontSize = 20;
            GUILayout.Label("Roue Parameters", style);

            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button("<- TEST"))
            {
                _interactable.TestTurn(1f);
            }

            if (GUILayout.Button("TEST ->"))
            {
                _interactable.TestTurn(-1f);
            }

            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();
            if(GUILayout.Button(_data.roue2))
            {
                _myObj.type = RoueType.One;
                _myObj.angleTurn = 180f;
                _interactable.transform.localRotation = Quaternion.identity;

            }
            if (GUILayout.Button(_data.roue4))
            {
                _myObj.type = RoueType.Two;
                _myObj.angleTurn = 90f;
                _interactable.transform.localRotation = Quaternion.identity;

            }
            EditorGUILayout.EndHorizontal();

            _myObj.speedTurn = EditorGUILayout.FloatField("Speed",_myObj.speedTurn);
            _myObj.secondsBetweenTurn = EditorGUILayout.FloatField("Seconds Between Turn",_myObj.secondsBetweenTurn);

            EditorGUILayout.BeginHorizontal();
            _interactCollider.radius = EditorGUILayout.FloatField("Interact Radius", _interactCollider.radius);
            if (GUILayout.Button("-0.1"))
            {
                _interactCollider.radius -= 0.1f;
            }
            if (GUILayout.Button("+0.1"))
            {
                _interactCollider.radius += 0.1f;
            }
            EditorGUILayout.EndHorizontal();


            if(_myObj.type == RoueType.One)
            {
                _interactable.ShowRoue(_myObj.colorsTypeOne, _myObj.type);
                for (int i = 0; i < _myObj.colorsTypeOne.Count; i++)
                {
                    _myObj.colorsTypeOne[i] = EditorGUILayout.ColorField("", _myObj.colorsTypeOne[i]);
                }
            }
            else if (_myObj.type == RoueType.Two)
            {
                _interactable.ShowRoue(_myObj.colorsTypeTwo, _myObj.type);
                for (int i = 0; i < _myObj.colorsTypeTwo.Count; i++)
                {
                    _myObj.colorsTypeTwo[i] = EditorGUILayout.ColorField("", _myObj.colorsTypeTwo[i]);
                }
            }

            if (EditorGUI.EndChangeCheck())
            {
                EditorUtility.SetDirty(_myObj);
            }
        }


        private void OnSceneGUI()
        {
            Handles.color = new Color(0.4f, 1f, 0.4f);
            Handles.DrawWireDisc(_interactCollider.transform.position, Vector3.forward, _interactCollider.radius, 3f);
        }
    }
    #endif


</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/6Q3vO5Z.gif" style="max-width: 100%; border-radius: 12px;">
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            LanguetteEditor.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    #if(UNITY_EDITOR)
    [CustomEditor(typeof(LanguetteData))]
    public class LanguetteEditor : Editor
    {
        TransformEditorData _data;
        LanguetteData _currentData;
        List<Vector3> _points = new List<Vector3>();
        SphereCollider _interactCollider;
        Languette _languet;


        private void OnEnable()
        {
            _data = (TransformEditorData)AssetDatabase.LoadAssetAtPath("Assets/Scripts/Victor/TransformEditor/TransformEditorTextureData.asset", typeof(TransformEditorData));
            _currentData = (LanguetteData)target;
            _interactCollider = _currentData.GetComponentInChildren<SphereCollider>();
            _languet = _currentData.GetComponentInChildren<Languette>();
        }
            
        public override void OnInspectorGUI()
        {
            GUIStyle style = new GUIStyle(EditorStyles.boldLabel);
            style.normal.textColor = new Color(0.5f, 0.5f, 1f);
            style.fontSize = 20;
            GUILayout.Label("Languette Parameters", style);

            GUI.backgroundColor = Color.white;

            EditorGUI.BeginChangeCheck();
            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button(_data.leftArrowRed))
            {
                _currentData.transform.rotation = Quaternion.Euler(0f, 0f, 0f);
            }
            if (GUILayout.Button(_data.downArrowRed))
            {
                _currentData.transform.rotation = Quaternion.Euler(0f, 0f, 90f);
            }
            if (GUILayout.Button(_data.rightArrowRed))
            {
                _currentData.transform.rotation = Quaternion.Euler(0f, 0f, 180f);

            }
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();
            _currentData.maxLength = EditorGUILayout.FloatField("Length", _currentData.maxLength);
            if (GUILayout.Button("  -1  "))
            {
                _currentData.maxLength -= 1f;
            }
            if (GUILayout.Button("  +1  "))
            {
                _currentData.maxLength += 1f;
            }
            EditorGUILayout.EndHorizontal();
            if (_currentData.maxLength < 1f)
            {
                _currentData.maxLength = 1f;
            }

            EditorGUILayout.BeginHorizontal();
            _interactCollider.radius = EditorGUILayout.FloatField("Interact Radius", _interactCollider.radius);
            if (GUILayout.Button("-0.1"))
            {
                _interactCollider.radius -= 0.1f;
            }
            if (GUILayout.Button("+0.1"))
            {
                _interactCollider.radius += 0.1f;
            }
            EditorGUILayout.EndHorizontal();

            //_currentData.color = EditorGUILayout.ColorField("Color", _currentData.color);
            //_languet.ChangeColor(_currentData.color);

            EditorGUILayout.Space(8f);

            GUIStyle style2 = new GUIStyle(EditorStyles.boldLabel);
            style2.normal.textColor = new Color(1f,0.5f,0.5f);
            style2.fontSize = 20;

            EditorGUILayout.LabelField("Languette Type", style2);
            EditorGUILayout.Space(5);

            if(GUILayout.Button("TEST"))
            {
                _languet.SimulateActivation();
            }


            _currentData.type = EditorGUILayout.Popup(_currentData.type, new GUIContent[] { new GUIContent("Stay"), new GUIContent("Timed"), new GUIContent("Slider") });

            switch (_currentData.type)
            {
                case 0:
                    _currentData.releaseSpeed = 0f;
                    _currentData.addSpeed = EditorGUILayout.FloatField("Pull speed", _currentData.addSpeed);
                    _currentData.isSlider = false;
                    break;
                case 1:
                    _currentData.addSpeed = EditorGUILayout.FloatField("Pull speed", _currentData.addSpeed);
                    _currentData.releaseSpeed = EditorGUILayout.FloatField("Release speed", _currentData.releaseSpeed);
                    _currentData.isSlider = false;
                    break;
                case 2:
                    _currentData.addSpeed = EditorGUILayout.FloatField("Pull speed", _currentData.addSpeed);
                    _currentData.releaseSpeed = EditorGUILayout.FloatField("Release speed", _currentData.releaseSpeed);
                    _currentData.isSlider = true;
                    break;
            }

            _currentData.isGravityAffected = EditorGUILayout.Toggle("Affected by gravity",_currentData.isGravityAffected);
            if(_currentData.isGravityAffected)
            {
                EditorGUILayout.HelpBox("It's affected by gravity only if it's facing down (making a down languet or turned by a wheel)",MessageType.Warning);
            }
            if(EditorGUI.EndChangeCheck())
            {
            EditorUtility.SetDirty(_currentData);
            }

            SceneView.RepaintAll(); 
        }

        private void OnSceneGUI()
        {
            Handles.color = new Color(1f, 0.3f, 0.3f);
            Handles.DrawLine(_currentData.transform.position + _currentData.transform.up * -0.5f, _currentData.transform.position + _currentData.transform.up * 0.5f, 2f);
            Handles.DrawLine(_currentData.transform.position + -_currentData.transform.right * (_currentData.maxLength + 1f) + _currentData.transform.up * -0.5f, _currentData.transform.position + -_currentData.transform.right * (_currentData.maxLength + 1f) + _currentData.transform.up * 0.5f, 2f);
            Handles.DrawLine(_currentData.transform.position + -_currentData.transform.right * (_currentData.maxLength + 1f) + _currentData.transform.up * -0.5f, _currentData.transform.position + _currentData.transform.up * -0.5f, 2f);
            Handles.DrawLine(_currentData.transform.position + _currentData.transform.up * 0.5f, _currentData.transform.position + -_currentData.transform.right * (_currentData.maxLength + 1f) + _currentData.transform.up * 0.5f, 2f);
            Handles.color = new Color(0.4f, 1f, 0.4f);
            Handles.DrawWireDisc(_languet.anchorPoint.position, Vector3.forward, _interactCollider.radius, 3f);

            Handles.color = new Color(0.4f, 0.4f, 1f);
            foreach (Vector3 item in _points)
            {
                Handles.DrawLine(_currentData.transform.position, item);
            }

        }
    }

    #endif

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/udv03C5.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Transform Snapping Tool:</strong> Transform position snapping tool with presets stored in scriptable objects
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            TransformEditor.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    #if(UNITY_EDITOR)
    [CustomEditor(typeof(Transform))]
    public class TransformEditor : Editor
    {
        int _isBasic = 0;
        private Transform _Transform = null;
        public TransformEditorData _data;
        private float _addAmount = 1f;
        private float _deletedData = float.NaN;
        private MyPreset _currentPreset;
        bool _scaleLock = false;
        SerializedProperty m_Position;
        SerializedProperty m_Rotation;
        SerializedProperty m_Scale;

        private void OnEnable()
        {
            _data = (TransformEditorData)AssetDatabase.LoadAssetAtPath("Assets/Scripts/Victor/TransformEditor/TransformEditorTextureData.asset", typeof(TransformEditorData));
            _Transform = (Transform)target;
            m_Position = serializedObject.FindProperty("m_LocalPosition");
            m_Rotation = serializedObject.FindProperty("m_LocalRotation");
            m_Scale = serializedObject.FindProperty("m_LocalScale");
        }

        public override void OnInspectorGUI()
        {
            _isBasic = EditorGUILayout.Popup(_isBasic, new GUIContent[] { new GUIContent("Transform"), new GUIContent("Snapped Move")});
            if (GUILayout.Button("Reset"))
            {
                _Transform.localPosition = new Vector3(0f, 0f, 0f);
                _Transform.localRotation = Quaternion.Euler(0f, 0f, 0f);
                _Transform.localScale = new Vector3(1f, 1f, 1f);
            }
            if (!EditorGUIUtility.wideMode)
            {
                EditorGUIUtility.wideMode = true;
                EditorGUIUtility.labelWidth = EditorGUIUtility.currentViewWidth - 212;
            }

            if (_isBasic == 0)
            {
                EditorGUILayout.PropertyField(m_Position, new GUIContent("Position"));
                EditorGUILayout.PropertyField(m_Rotation, new GUIContent("Rotation"));
                
                Vector3 oldScale = m_Scale.vector3Value;
                EditorGUILayout.PropertyField(m_Scale, new GUIContent("Scale"));

                _scaleLock = GUILayout.Toggle(_scaleLock, new GUIContent("Lock Scale"));
                if (_scaleLock && oldScale != m_Scale.vector3Value)
                {
                    serializedObject.ApplyModifiedProperties();
                    float ratio = (m_Scale.vector3Value.x / oldScale.x) * (m_Scale.vector3Value.y / oldScale.y) * (m_Scale.vector3Value.z / oldScale.z);

                    if (oldScale.x != m_Scale.vector3Value.x)
                    {
                        _Transform.localScale = new Vector3(m_Scale.vector3Value.x, m_Scale.vector3Value.y * ratio, m_Scale.vector3Value.z * ratio);
                    }
                    else if (oldScale.y != m_Scale.vector3Value.y)
                    {
                        _Transform.localScale = new Vector3(m_Scale.vector3Value.x * ratio, m_Scale.vector3Value.y, m_Scale.vector3Value.z * ratio);
                    }
                    else if (oldScale.z != m_Scale.vector3Value.z)
                    {
                        _Transform.localScale = new Vector3(m_Scale.vector3Value.x * ratio, m_Scale.vector3Value.y * ratio, m_Scale.vector3Value.z);
                    }
                }
            }
            else
            {
                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.BeginVertical();

                if (GUILayout.Button(_data.diagonalLeftUpArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x - _addAmount, m_Position.vector3Value.y, m_Position.vector3Value.z);
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x, m_Position.vector3Value.y + _addAmount, m_Position.vector3Value.z);
                }
                if (GUILayout.Button(_data.leftArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x - _addAmount, m_Position.vector3Value.y, m_Position.vector3Value.z);
                }
                if (GUILayout.Button(_data.diagonalLeftDownArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x - _addAmount, m_Position.vector3Value.y, m_Position.vector3Value.z);
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x, m_Position.vector3Value.y - _addAmount, m_Position.vector3Value.z);
                }
                EditorGUILayout.EndVertical();
                EditorGUILayout.BeginVertical();

                if (GUILayout.Button(_data.upArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x, m_Position.vector3Value.y + _addAmount, m_Position.vector3Value.z);
                }
                if (GUILayout.Button(_data.square))
                {
                    m_Position.vector3Value = new Vector3(Mathf.RoundToInt(m_Position.vector3Value.x), Mathf.RoundToInt(m_Position.vector3Value.y), m_Position.vector3Value.z);
                }
                if (GUILayout.Button(_data.downArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x, m_Position.vector3Value.y - _addAmount, m_Position.vector3Value.z);
                }
                EditorGUILayout.EndVertical();
                EditorGUILayout.BeginVertical();

                if (GUILayout.Button(_data.diagonalRightUpArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x + _addAmount, m_Position.vector3Value.y, m_Position.vector3Value.z);
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x, m_Position.vector3Value.y + _addAmount, m_Position.vector3Value.z);
                }
                if (GUILayout.Button(_data.rightArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x + _addAmount, m_Position.vector3Value.y, m_Position.vector3Value.z);
                }
                if (GUILayout.Button(_data.diagonalRightDownArrow))
                {
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x + _addAmount, m_Position.vector3Value.y, m_Position.vector3Value.z);
                    m_Position.vector3Value = new Vector3(m_Position.vector3Value.x, m_Position.vector3Value.y - _addAmount, m_Position.vector3Value.z);
                }
                EditorGUILayout.EndVertical();
                EditorGUILayout.EndHorizontal();

                _addAmount = EditorGUILayout.FloatField("Move amount", _addAmount);

                EditorGUILayout.BeginHorizontal();
                _currentPreset = (MyPreset)EditorGUILayout.EnumPopup("My preset", _currentPreset);


                if (GUILayout.Button(" Add preset"))
                {
                    _data.preset[_currentPreset].Add(_addAmount);
                }
                EditorGUILayout.EndHorizontal();
                EditorGUILayout.BeginVertical();
                foreach (float item in _data.preset[_currentPreset])
                {
                    EditorGUILayout.BeginHorizontal();
                    if (GUILayout.Button(item.ToString()))
                    {
                        _addAmount = item;
                    }
                    if (GUILayout.Button("Delete Preset"))
                    {
                        _deletedData = item;
                    }
                    EditorGUILayout.EndHorizontal();
                }
                if (_deletedData != float.NaN)
                {
                    _data.preset[_currentPreset].Remove(_deletedData);
                    _deletedData = float.NaN;
                }

                EditorGUILayout.EndVertical();
            }
            serializedObject.ApplyModifiedProperties();
        }
    }
    #endif

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/mdIcTNo.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Camera View Gizmos:</strong> Visual debugging tools to enhance camera system visualization
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            CameraWaypoint.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public enum WaypointType
    {
        Automatic,
        Fixed
    }

    public class CameraWaypoint : MonoBehaviour
    {
        public WaypointType type = WaypointType.Automatic;
        public float size = 10f;
        List<PlayerData> players = new List<PlayerData>();


        private void OnTriggerEnter(Collider other)
        {
            if (type == WaypointType.Automatic) return;
            PlayerData cash = other.GetComponent<PlayerData>();
            if(cash != null && !players.Contains(cash))
            {
                players.Add(cash);
            }
        }

        private void OnTriggerExit(Collider other)
        {
            if (type == WaypointType.Automatic) return;
            PlayerData cash = other.GetComponent<PlayerData>();
            if (cash != null && players.Contains(cash))
            {
                players.Remove(cash);
            }
        }

        public bool IsInside()
        {
            if(players.Count == 2)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    #if(UNITY_EDITOR)
        private void OnDrawGizmos()
        {
            Gizmos.color = Color.green;
            Gizmos.DrawLine(transform.position + Vector3.up * size + Vector3.left * size * Camera.main.aspect, transform.position + Vector3.up * size + Vector3.right * size * Camera.main.aspect);
            Gizmos.DrawLine(transform.position + Vector3.down * size + Vector3.left * size * Camera.main.aspect, transform.position + Vector3.down * size + Vector3.right * size * Camera.main.aspect);
            Gizmos.DrawLine(transform.position + Vector3.down * size + Vector3.right * size * Camera.main.aspect, transform.position + Vector3.up * size + Vector3.right * size * Camera.main.aspect);
            Gizmos.DrawLine(transform.position + Vector3.down * size + Vector3.left * size * Camera.main.aspect, transform.position + Vector3.up * size + Vector3.left * size * Camera.main.aspect);
        }
    #endif
    }

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/wylx2ky.jpeg" 
                         style="max-width: 100%; border-radius: 12px; display: flex; gap: 10px; margin: auto;">
                </div>
            </li>
        </ul>
        <p>
            These tools prioritized usability for both developers and designers, enhancing efficiency in level design and system implementation.
        </p>
    </div>
</div>