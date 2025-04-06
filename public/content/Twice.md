<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#tools" style="color: #007bff; text-decoration: none; margin: 0 10px;">🛠️ Tools </a>
<a href="#lesson" style="color: #007bff; text-decoration: none; margin: 0 10px;">📌 Lessons Learned </a>

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
        </p>
        <p>
            <p style="margin-bottom: 1.2rem;">
                 On this project I developped :
            <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            <li>Interface-based interaction system</li>
            <li>World interactions</li>
            <li>State machine-based platformer movement</li>
            <li>Custom animation system</li>
            <li>Skin system </li>
            <li>Camera system</li>
        </ul>
        </p>
    </div>
</div>


<div id="tools" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🛠️ Tools</h2>
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


<div id="network" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👨‍💻 Custom Netcode</h2>
        <ul style="font-size: 120%;">
        <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Player Connection</span>
                <p>
                    Each player when launching the game create a friends only lobby. Then when the player join a lobby it create or join the steam socket server based on who is the host. The host's SteamId is used as the "key" to connect to the socket server;
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            OnLobbyEntered(Lobby lobby)
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    private void OnLobbyEntered(Lobby lobby)
    {
        "Lobby Entered".Log();
        if (connectionManager != null)
        {
            connectionManager.Close();
        }

        if (socketManager != null)
        {
            socketManager.Close();
        }

        currentLobby = lobby;

        if (lobby.Owner.Id == SteamClient.SteamId)
        {
            socketManager = SteamNetworkingSockets.CreateRelaySocket(0, server);
            server.ResetPlayers();
        }
        connectionManager = SteamNetworkingSockets.ConnectRelay(lobby.Owner.Id, 0, client);
    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Lobbies</span>
                <p>
                    I used Facepunch API to make lobbies when needed, such as when a friend sends an invite or when you want to join a public lobby.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            CreateFriendLobbyAsync()
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public async void CreateFriendLobbyAsync()
    {
        try
        {
            var createLobbyResult = await SteamMatchmaking.CreateLobbyAsync(maxPlayer);
            if (createLobbyResult.HasValue)
            {
                currentLobby = createLobbyResult.Value;

                currentLobby.SetFriendsOnly();
                currentLobby.SetJoinable(true);
            }
            else
            {
                Debug.LogError("Failed to create lobby.");
            }
        }
        catch (System.Exception ex)
        {
            Debug.LogError($"Error creating lobby: {ex.Message}");
        }
    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
    <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Socket Server</span>
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